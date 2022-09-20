import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ROOT_URL } from "./api/constants";
import { getAllNotesCall } from "./api/notesApiCall";
import { RootState } from "./store";

interface NotesResponse {
  loading: boolean;
  error: string | null;
  data: any;
}
const initialState: NotesResponse = {
  data: null,
  loading: false,
  error: "",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotesCall.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllNotesCall.fulfilled, (state, action: PayloadAction<NotesResponse>) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllNotesCall.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ? action.error.message : "Fetch notes failed";
    });
  },
});

export default notesSlice.reducer;
