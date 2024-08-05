import { configureStore } from '@reduxjs/toolkit';
import avocatReducer from './AvocatSlice';
import activityReducer from './ActivtesPreferentiellesSlice';
import languesReducer from './LanguagesSlice'
import userReducer from './UserSlice';

const store = configureStore({
  reducer: {
    avocat: avocatReducer,
    user: userReducer,
    activities: activityReducer,
    langues: languesReducer,
  }
});


export default store;
