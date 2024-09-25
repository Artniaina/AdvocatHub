import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  formulaire: null,
  status: "idle",
  error: null,
};

export const fetchFormulaireById = createAsyncThunk(
  "formulaire/fetchFormulaireById",
  async (idFormulaire) => {
    const response = await fetch(
      `http://192.168.10.10/Utilisateur/FormulaireDeTaxation/${idFormulaire}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch formulaire");
    }

    const data = await response.json();
    return data[0];
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
        state.error = action.error.message;
      });
  },
});

export default formulaireSlice.reducer;
