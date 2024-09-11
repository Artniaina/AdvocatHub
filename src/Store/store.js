import { configureStore } from '@reduxjs/toolkit';
import avocatReducer from './AvocatSlice';
import activityReducer from './ActivtesPreferentiellesSlice';
import languesReducer from './LanguagesSlice'
import countryCodesReducer from './countryCodesSlice';

const store = configureStore({
  reducer: {
    avocat: avocatReducer,
    countryCodes: countryCodesReducer,
    activities: activityReducer,
    langues: languesReducer,
  }
});


export default store;
