import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  formulaireDraft: [], 
  status: "idle", 
  error: null,
};

export const fetchFormulaireByEmail = createAsyncThunk(
  "formulaireDraft/fetchFormulaireByEmail",
  async (emailUtilisateur) => {
    const response = await fetch(`${apiUrl}/Utilisateur/GetListFormulaire/${emailUtilisateur}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data; 
  }
);

const formulaireDraftSlice = createSlice({
  name: "formulaireDraft",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormulaireByEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFormulaireByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formulaireDraft = action.payload || [];
      })
      .addCase(fetchFormulaireByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default formulaireDraftSlice.reducer;
