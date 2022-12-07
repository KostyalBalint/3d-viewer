import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuState = {
  fileName: string;
  showBasePlane: boolean;
  showCapturePoints: boolean;
  numberOfCapturePoints: number | null;
  captureSphereRadius: number | null;
  showCamPoints: boolean;
  isCapturing: boolean;
  cameraType: "perspective" | "orthographic";
};

const initialState: MenuState = {
  fileName: "ferrari.glb",
  showBasePlane: true,
  showCapturePoints: false,
  showCamPoints: false,
  numberOfCapturePoints: 20,
  captureSphereRadius: 5,
  isCapturing: false,
  cameraType: "perspective",
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
    setShowCapturePoints: (state, action: PayloadAction<boolean>) => {
      state.showCapturePoints = action.payload;
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
    setCameraType: (
      state,
      action: PayloadAction<"perspective" | "orthographic">
    ) => {
      state.cameraType = action.payload;
    },
    setShowCamPoints: (state, action: PayloadAction<boolean>) => {
      state.showCamPoints = action.payload;
    },
  },
});
