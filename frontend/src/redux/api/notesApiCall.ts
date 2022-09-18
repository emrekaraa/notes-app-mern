import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_ROOT_URL } from "./constants";

interface NotesParams {
  direction?: "ASC" | "DESC";
}
interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllNotesCall = createAsyncThunk(
  "fetchAllNotes",
  async (notesParams?: NotesParams) => {
    try {
      const response = await axios.get<Note[]>(`${BACKEND_ROOT_URL}/api/notes`, {
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
