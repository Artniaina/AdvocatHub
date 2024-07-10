import { configureStore } from '@reduxjs/toolkit';
import avocatReducer from './AvocatSlice';
import activityReducer from './ActivtesPreferentiellesSlice';

const store = configureStore({
  reducer: {
    avocat: avocatReducer,
    activities: activityReducer,
  }
});


export default store;
