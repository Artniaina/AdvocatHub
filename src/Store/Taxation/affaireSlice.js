// redux/affaireSlice.js
import { createSlice } from '@reduxjs/toolkit';

const affaireSlice = createSlice({
  name: 'affaire',
  initialState: {
    showOptions: {
      affaire: "non",
      honoraires: "non",
      notes: "non",
      conciliation: "non",
      relative: "non",
      conserv: "non",
      mediation: "non",
      mediationChoix: "non",
    },
    popupVisible: {
      domaine: false,
      montant: false,
      honoraire: false,
      provision: false,
    },
    montantData: [],
    honoraireData: [],
    provisionData: [],
    selectedDomains: [],
    selectedMontantData: [],
    selectedHonoraireDate: '',
    selectedProvisionDate: '',
    uniqueHonoraireDates: [],
    uniqueProvisionDates: [],
    selectedAmount: "",
    selectedComment: "",
  },
  reducers: {
    setShowOptions: (state, action) => {
      state.showOptions = { ...state.showOptions, ...action.payload };
    },
    setPopupVisible: (state, action) => {
      state.popupVisible = { ...state.popupVisible, ...action.payload };
    },
    setMontantData: (state, action) => {
      state.montantData = action.payload;
    },
    setHonoraireData: (state, action) => {
      state.honoraireData = action.payload;
      state.uniqueHonoraireDates = [...new Set(action.payload.map(item => item.date))];
    },
    setProvisionData: (state, action) => {
      state.provisionData = action.payload;
      state.uniqueProvisionDates = [...new Set(action.payload.map(item => item.date))];
    },
    setSelectedDomains: (state, action) => {
      state.selectedDomains = action.payload;
    },
    setSelectedMontantData: (state, action) => {
      state.selectedMontantData = action.payload;
    },
    setSelectedHonoraireDate: (state, action) => {
      state.selectedHonoraireDate = action.payload;
    },
    setSelectedProvisionDate: (state, action) => {
      state.selectedProvisionDate = action.payload;
    },
    setSelectedAmount: (state, action) => {
      state.selectedAmount = action.payload;
    },
    setSelectedComment: (state, action) => {
      state.selectedComment = action.payload;
    }
  }
});

export const {
  setShowOptions,
  setPopupVisible,
  setMontantData,
  setHonoraireData,
  setProvisionData,
  setSelectedDomains,
  setSelectedMontantData,
  setSelectedHonoraireDate,
  setSelectedProvisionDate,
  setSelectedAmount,
  setSelectedComment
} = affaireSlice.actions;

export default affaireSlice.reducer;
