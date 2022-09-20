import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  darkMode: boolean;
  loading: boolean;
}

const initialState: CounterState = {
  darkMode: false,
  loading: false,
};

export const siteConfigSlice = createSlice({
  name: "siteConfig",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDarkMode, setLoading } = siteConfigSlice.actions;
export default siteConfigSlice.reducer;
