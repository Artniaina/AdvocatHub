import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  formulaires: [],
  status: 'idle', 
  error: null,
};

export const fetchFormulaires = createAsyncThunk(
  'formulaires/fetchFormulaires',
  async (emailUtilisateur) => {
    const response = await fetch(
      `http://192.168.10.10/Utilisateur/GetListFormulaire/${emailUtilisateur}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch formulaires');
    }

    const data = await response.json();
    return data;
  }
);

const formulaireSlice = createSlice({
  name: 'formulaires',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormulaires.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormulaires.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formulaires = action.payload;
      })
      .addCase(fetchFormulaires.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default formulaireSlice.reducer;
