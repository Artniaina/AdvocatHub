import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLangues = createAsyncThunk(
  "langues/fetchLangues",
  async () => {
    const response = await fetch(
      "http://192.168.10.10/Utilisateur/LanguesParlées"
    );
    const data = await response.json();
    return data.map((langue) => ({
      code: langue.Code,
      name: langue.NomLangue,
    }));
  }
);

const languagesSlice = createSlice({
  name: "langues",
  initialState: {
    langues: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLangues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLangues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.langues = action.payload;
      })
      .addCase(fetchLangues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default languagesSlice.reducer;
