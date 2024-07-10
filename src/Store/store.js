import { configureStore } from '@reduxjs/toolkit';
import avocatReducer from './AvocatSlice';
import activityReducer from './ActivtesPreferentiellesSlice';
import languesReducer from './LanguagesSlice'

const store = configureStore({
  reducer: {
    avocat: avocatReducer,
    activities: activityReducer,
    langues: languesReducer,
  }
});


export default store;
