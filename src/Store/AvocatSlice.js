import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  avocatInfo: null,
  etudeInfo: null,
  loading: false,
  error: null,
};
export const fetchAvocatInfo = createAsyncThunk(
  'avocat/fetchAvocatInfo',
  async (email) => {
    const response = await fetch(`http://192.168.10.10/Utilisateur/AvocatInfo/${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch avocat info');
    }
    return (await response.json())[0];
  }
);

export const fetchEtudeInfo = createAsyncThunk(
  'avocat/fetchEtudeInfo',
  async (id) => {
    const response = await fetch(`http://192.168.10.10/Utilisateur/AvocatEtude/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch etude info');
    }
    return (await response.json())[0];
  }
); 

const avocatSlice = createSlice({
  name: 'avocat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvocatInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvocatInfo.fulfilled, (state, action) => {
        state.avocatInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvocatInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch avocat info';
      })
      .addCase(fetchEtudeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEtudeInfo.fulfilled, (state, action) => {
        state.etudeInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchEtudeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch etude info';
      });   
  },
});

export default avocatSlice.reducer;
