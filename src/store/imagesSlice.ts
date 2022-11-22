import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ImagesState = {
  images: string[];
};

const initialState: ImagesState = {
  images: [],
};

export const imagesSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload);
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
});
