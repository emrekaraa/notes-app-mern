import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ROOT_URL } from "./api/constants";
import { getAllNotesCall } from "./api/notesApiCall";
import { RootState } from "./store";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesState {
  data: Note[];
  loading: boolean;
  error: string;
}

const initialState: NotesState = {
  data: [],
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
    builder.addCase(getAllNotesCall.fulfilled, (state, action: PayloadAction<Note[]>) => {
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
