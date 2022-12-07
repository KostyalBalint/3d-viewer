import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CamPathPoint {
  R: number[];
  T: number[];
  aperture_size: number;
  fov: number;
  glow_mode: number;
  glow_y_cutoff: number;
  scale: number;
  slice: number;
}

interface CamPath {
  path: CamPathPoint[];
  time: number;
}

const initialState: CamPath = {
  path: [
    {
      R: [1, 0, 0],
      T: [0.5, 0.5, 2],
      aperture_size: 0.0,
      fov: 50.625,
      glow_mode: 0,
      glow_y_cutoff: 0.0,
      scale: 1.5,
      slice: 0.0,
    },
  ],
  time: 1.0,
};

export const camPathSlice = createSlice({
  name: "camPath",
  initialState: initialState,
  reducers: {
    addCamPathPoint: (state, action: PayloadAction<CamPathPoint>) => {
      state.path.push(action.payload);
    },
  },
});
