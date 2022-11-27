import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GeneratedImage = {
  uri: string;
  name: string;
};

type Frame = {
  file_path: string;
  sharpness: number;
  transform_matrix: number[][]; // 4x4 matrix
};

export type CameraTransform = {
  camera_angle_x: number;
  camera_angle_y: number;
  fl_x: number;
  fl_y: number;
  k1: number;
  k2: number;
  p1: number;
  p2: number;
  cx: number;
  cy: number;
  w: number;
  h: number;
  aabb_scale: number;
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
