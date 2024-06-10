import { configureStore } from '@reduxjs/toolkit';
import avocatReducer from './AvocatSlice';

const store = configureStore({
  reducer: {
    avocat: avocatReducer,
  },
});

export default store;
