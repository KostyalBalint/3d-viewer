import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GeneratedImage = {
  uri: string;
  name: string;
};

type ImagesState = {
  images: GeneratedImage[];
};

const initialState: ImagesState = {
  images: [],
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
  },
});
