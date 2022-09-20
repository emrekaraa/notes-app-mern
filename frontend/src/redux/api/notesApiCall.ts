import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_ROOT_URL } from "./constants";
import { setLoading } from "../siteConfigSlice";

interface NotesParams {
  direction?: "ASC" | "DESC";
}
interface AddNewNoteData {
  title: string;
  description: string;
}
interface NotesResponse {
  loading: boolean;
  error: string | null;
  data: any;
}

export const getAllNotesCall = createAsyncThunk(
  "fetchAllNotes",
  async (notesParams: NotesParams = { direction: "DESC" }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get<NotesResponse>(`${BACKEND_ROOT_URL}/api/notes`, {
        params: notesParams ? notesParams : {},
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteNoteCall = createAsyncThunk(
  "deleteNote",
  async (id: string, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(`${BACKEND_ROOT_URL}/api/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addNewNoteCall = createAsyncThunk(
  "addNewNote",
  async (data: AddNewNoteData, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BACKEND_ROOT_URL}/api/notes`, {
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
