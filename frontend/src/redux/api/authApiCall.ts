import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_ROOT_URL } from "./constants";
import { setLoading } from "../siteConfigSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import i18n from "../../i18n";
import { setAuthToken, setUserInfo } from "../userSlice";

export const registerCall = createAsyncThunk(
  "register",
  async (args: any, { dispatch, getState }: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BACKEND_ROOT_URL}/api/auth/register`,
        {
          fullName: args.fullName,
          email: args.email,
          password: args.password,
          rePassword: args.rePassword,
          profileImage: args.profileImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const messageTranslate = i18n.t("registerSuccess");
      toast.success(messageTranslate);

      return response.data;
    } catch (error: any) {
      const messageTranslate = i18n.t("registerError");
      toast.error(messageTranslate);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const loginCall = createAsyncThunk(
  "login",
  async (args: any, { dispatch, getState }: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BACKEND_ROOT_URL}/api/auth/login`,
        {
          email: args.email,
          password: args.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(setAuthToken(response.data.token));
      dispatch(
        setUserInfo({
          id: response.data.user._id,
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          profileImage: response.data.user.profileImage,
        })
      );

      Cookies.set("authToken", response.data.token, { expires: 7 });

      const messageTranslate = i18n.t("loginSuccess");
      toast.success(messageTranslate);

      return response.data;
    } catch (error: any) {
      const messageTranslate = i18n.t("loginError");
      toast.error(messageTranslate);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getMeCall = createAsyncThunk(
  "getMe",
  async (args: any, { dispatch, getState }: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BACKEND_ROOT_URL}/api/auth/getMe`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${args.authToken}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
