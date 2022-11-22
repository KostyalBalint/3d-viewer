import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuState = {
  fileName: string;
  showBasePlane: boolean;
  numberOfCapturePoints: number | null;
  captureSphereRadius: number | null;
  isCapturing: boolean;
};

const initialState: MenuState = {
  fileName: "",
  showBasePlane: true,
  numberOfCapturePoints: 20,
  captureSphereRadius: 5,
  isCapturing: false,
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
    setIsCapturing: (state, action: PayloadAction<boolean>) => {
      state.isCapturing = action.payload;
    },
  },
});
