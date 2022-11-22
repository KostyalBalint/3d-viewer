import { Button } from "@mui/material";
import { PauseSharp, PlayArrow } from "@mui/icons-material";
import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { menuSlice } from "../store/menuSlice";

export function CaptureButton() {
  const dispatch = useAppDispatch();
  const isCapturing = useAppSelector((state) => state.menu.isCapturing);

  return (
    <Button
      variant="contained"
      color={isCapturing ? "error" : "success"}
      startIcon={isCapturing ? <PauseSharp /> : <PlayArrow />}
      sx={{ my: 1 }}
      onClick={() => {
        dispatch(menuSlice.actions.setIsCapturing(!isCapturing));
      }}
    >
      Capture
    </Button>
  );
}
