import { createSlice } from "@reduxjs/toolkit";

interface User {
  authToken: string;
  userInfo: {
    id: string;
    fullName: string;
    email: string;
    profileImage?: string;
  };
}

const initialState: User = {
  authToken: "",
  userInfo: {
    id: "",
    fullName: "",
    email: "",
    profileImage: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    logOut: (state) => {
      state.authToken = "";
      state.userInfo = {
        id: "",
        fullName: "",
        email: "",
        profileImage: "",
      };
    },
  },
});

export const { setUserInfo, setAuthToken, logOut } = userSlice.actions;
export default userSlice.reducer;
