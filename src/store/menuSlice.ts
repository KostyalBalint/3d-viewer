import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuState = {
  fileName: string;
  showBasePlane: boolean;
};

const initialState: MenuState = {
  fileName: "",
  showBasePlane: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    setShowBasePlane: (state, action: PayloadAction<boolean>) => {
      state.showBasePlane = action.payload;
    },
  },
});
