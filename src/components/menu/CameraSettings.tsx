import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { menuSlice } from "../../store/menuSlice";

export function CameraSettings() {
  const cameraType = useAppSelector((state) => state.menu.cameraType);
  const dispatch = useAppDispatch();
  return (
    <>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Capture camera type
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={cameraType}
          onChange={(event, value: string) =>
            dispatch(
              menuSlice.actions.setCameraType(
                value === "perspective" ? "perspective" : "orthographic"
              )
            )
          }
        >
          <FormControlLabel
            value="perspective"
            control={<Radio />}
            label="Perspective"
          />
          <FormControlLabel
            value="orthographic"
            control={<Radio />}
            label="Orthographic"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
