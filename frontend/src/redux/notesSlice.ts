import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewNoteCall, deleteNoteCall, getAllNotesCall } from "./api/notesApiCall";

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
    // Fetch all notes
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

    // Delete note
    builder.addCase(deleteNoteCall.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(deleteNoteCall.fulfilled, (state, action) => {
      state.data.notes = state.data.notes.filter(
        (note: any) => note._id !== action.payload.deletedNote._id
      );
      state.loading = false;
    });

    builder.addCase(deleteNoteCall.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ? action.error.message : "Delete note failed";
    });

    // Create note
    builder.addCase(addNewNoteCall.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addNewNoteCall.fulfilled, (state, action) => {
      state.data.notes.push(action.payload.newNote);
      state.loading = false;
    });

    builder.addCase(addNewNoteCall.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ? action.error.message : "Create note failed";
    });
  },
});

export default notesSlice.reducer;
