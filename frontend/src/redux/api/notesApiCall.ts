import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_ROOT_URL } from "./constants";

interface NotesParams {
  direction?: "ASC" | "DESC";
}
interface NotesResponse {
  loading: boolean;
  error: string | null;
  data: any;
}

export const getAllNotesCall = createAsyncThunk(
  "fetchAllNotes",
  async (notesParams?: NotesParams) => {
    try {
      const response = await axios.get<NotesResponse>(`${BACKEND_ROOT_URL}/api/notes`, {
        params: notesParams ? notesParams : {},
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
