import { configureStore } from "@reduxjs/toolkit";
import avocatReducer from "./AvocatSlice";
import activityReducer from "./ActivtesPreferentiellesSlice";
import languesReducer from "./LanguagesSlice";
import countryCodesReducer from "./countryCodesSlice";
import formulaireReducer from "./TaxationFormSlice";
import formulaireDraftReducer from "./TaxationDraftListeSlice";

const store = configureStore({
  reducer: {
    avocat: avocatReducer,
    countryCodes: countryCodesReducer,
    activities: activityReducer,
    langues: languesReducer,
    formulaire: formulaireReducer,
    formulaireDraft: formulaireDraftReducer,
  },
});

export default store;
