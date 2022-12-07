import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GeneratedImage = {
  uri: string;
  name: string;
};

type Frame = {
  file_path: string;
  sharpness: number; // ~30
  transform_matrix: number[][]; // 4x4 matrix
};

export type CameraTransform = {
  camera_angle_x: number; // 0.7481849417937728,
  camera_angle_y: number; // 1.2193576119562444,
  fl_x: number; // 1375.52,
  fl_y: number; // 1374.49,
  k1: number; // 0.0578421,
  k2: number; //-0.0805099,
  p1: number; //-0.000980296,
  p2: number; // 0.00015575,
  cx: number; // 554.558,
  cy: number; // 965.268,
  w: number; // 1080.0,
  h: number; // 1920.0,
  aabb_scale: number; // 4
};

export type CameraTransforms = CameraTransform & {
  frames: Frame[];
};

type ImagesState = {
  images: GeneratedImage[];
  transforms: CameraTransforms;
};

const initialState: ImagesState = {
  images: [],
  transforms: {
    camera_angle_x: 0,
    camera_angle_y: 0,
    fl_x: 0,
    fl_y: 0,
    k1: 0,
    k2: 0,
    p1: 0,
    p2: 0,
    cx: 0,
    cy: 0,
    w: 0,
    h: 0,
    aabb_scale: 0,
    frames: [],
  },
};

export const imagesSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    addImage: (state, action: PayloadAction<GeneratedImage>) => {
      state.images.push(action.payload);
    },
    clearImages: (state) => {
      state.images = [];
      state.transforms.frames = [];
    },
    setTransforms: (state, action: PayloadAction<CameraTransform>) => {
      state.transforms = { ...action.payload, frames: state.transforms.frames };
    },
    addFrame: (state, action: PayloadAction<Frame>) => {
      state.transforms.frames.push(action.payload);
    },
    setFrames: (state, action: PayloadAction<Frame[]>) => {
      state.transforms.frames = action.payload;
    },
  },
});
