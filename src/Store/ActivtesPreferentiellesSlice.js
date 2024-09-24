import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async () => {
    const response = await fetch("http://192.168.10.10/Utilisateur/ActivitésPréférentielles");
    const data = await response.json();
    return data.map((activites) => ({
      code: activites.Code,
      name: activites.Valuebar,
    }));
  }
);

const activitySlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [],
    status: 'idle',
    error: null,
  }, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default activitySlice.reducer;
