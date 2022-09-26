import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
  },
});

export const { setUserInfo, setAuthToken } = userSlice.actions;
export default userSlice.reducer;
