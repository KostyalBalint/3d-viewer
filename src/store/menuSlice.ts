import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuState = {
  fileName: string;
  showBasePlane: boolean;
  numberOfCapturePoints: number | null;
  captureSphereRadius: number | null;
};

const initialState: MenuState = {
  fileName: "",
  showBasePlane: true,
  numberOfCapturePoints: 100,
  captureSphereRadius: 5,
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
    setNumberOfCapturePoints: (state, action: PayloadAction<number | null>) => {
      state.numberOfCapturePoints = action.payload;
    },
    setCaptureSphereRadius: (state, action: PayloadAction<number | null>) => {
      state.captureSphereRadius = action.payload;
    },
  },
});
