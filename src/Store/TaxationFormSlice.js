import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  formulaire: null,
  status: "idle",
  error: null,
};

export const fetchFormulaireById = createAsyncThunk(
  "formulaire/fetchFormulaireById",
  async (idFormulaire, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://192.168.10.10/Utilisateur/FormulaireDeTaxation/${idFormulaire}`
      );

      // Log response status and headers for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`Failed to fetch formulaire: ${response.statusText}`);
      }

      // Log the raw response body
      const text = await response.text();
      console.log("Raw response:", text);

      // Check if the response is valid JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(text);
        return data[0];  // Assuming the API returns an array
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error fetching formulaire:", error.message);
      return rejectWithValue(error.message);
    }
  }
);


const formulaireSlice = createSlice({
  name: "formulaire",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormulaireById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFormulaireById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formulaire = action.payload;
      })
      .addCase(fetchFormulaireById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      });
  },
});

export default formulaireSlice.reducer;
