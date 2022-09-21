import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewNoteCall, deleteNoteCall, getAllNotesCall } from "./api/notesApiCall";

interface NotesResponse {
  error: string | null;
  data: any;
  getAllNotesFilterOptions: any;
}
const initialState: NotesResponse = {
  data: null,
  error: "",
  getAllNotesFilterOptions: {
    direction: "DESC",
    page: 1,
    limit: 6,
  },
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setAllNotesFilterOptions(state, action: PayloadAction<any>) {
      state.getAllNotesFilterOptions = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all notes
    builder.addCase(getAllNotesCall.pending, (state, action) => {
      state.error = "";
    });
    builder.addCase(getAllNotesCall.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllNotesCall.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "Fetch notes failed";
    });

    // Delete note
    builder.addCase(deleteNoteCall.pending, (state, action) => {
      state.error = "";
    });

    builder.addCase(deleteNoteCall.fulfilled, (state, action) => {});

    builder.addCase(deleteNoteCall.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "Delete note failed";
    });

    // Create note
    builder.addCase(addNewNoteCall.pending, (state, action) => {
      state.error = "";
    });

    builder.addCase(addNewNoteCall.fulfilled, (state, action) => {});

    builder.addCase(addNewNoteCall.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "Create note failed";
    });
  },
});

export const { setAllNotesFilterOptions } = notesSlice.actions;

export default notesSlice.reducer;
