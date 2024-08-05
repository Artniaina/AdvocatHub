import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  avocatInfo: null,
  etudeInfo: null,
  userId: null,
  loading: false,
  error: null,
};

export const fetchAvocatInfo = createAsyncThunk(
  'avocat/fetchAvocatInfo',
  async (id) => {
    const response = await fetch(`http://192.168.10.5/Utilisateur/AvocatInfo/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch avocat info');
    }
    const data = await response.json();
    console.log('Fetched Avocat Data:', data); // Debugging: Check what data is returned
    const avocatInfo = data[0];
    const newId = avocatInfo.n_emailUser === avocatInfo.m_emailbarreau ? avocatInfo.m_nIDAvocat_PP : null;
    return { ...avocatInfo, id: newId };
  }
);

export const fetchEtudeInfo = createAsyncThunk(
  'avocat/fetchEtudeInfo',
  async (id) => {
    const response = await fetch(`http://192.168.10.5/Utilisateur/AvocatEtude/${id}`);
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
        console.log('Avocat Info Fulfilled:', action.payload); 
        state.avocatInfo = action.payload;
        state.userId = action.payload.id || null; // Ensure this is correct
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
