import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_ROOT_URL } from "./constants";
import { setLoading } from "../siteConfigSlice";
import { setAllNotesFilterOptions } from "../notesSlice";

interface NotesParams {
  direction?: "ASC" | "DESC";
  page?: number;
  limit?: number;
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
  async (notesParams: NotesParams, { dispatch, getState }: any) => {
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
  async (id: string, { dispatch, getState }: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(`${BACKEND_ROOT_URL}/api/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { getAllNotesFilterOptions } = await getState().notes;
      await dispatch(getAllNotesCall(getAllNotesFilterOptions));

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewNoteCall = createAsyncThunk(
  "addNewNote",
  async (data: AddNewNoteData, { dispatch, getState }: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BACKEND_ROOT_URL}/api/notes`, {
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { getAllNotesFilterOptions } = await getState().notes;

      dispatch(setAllNotesFilterOptions({ ...getAllNotesFilterOptions, page: 1 }));

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
