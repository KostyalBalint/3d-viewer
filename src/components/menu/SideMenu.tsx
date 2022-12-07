import {
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { menuSlice } from "../../store/menuSlice";
import { CaptureButton } from "../CaptureButton";
import { ImageViewer } from "../ImageViewer";
import { ImageDownloader } from "../ImageDownloader";

export function SideMenu() {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector((state) => state.menu.fileName);
  const showBasePlane = useAppSelector((state) => state.menu.showBasePlane);
  const showCapturePoints = useAppSelector(
    (state) => state.menu.showCapturePoints
  );
  const numberOfCapturePoints = useAppSelector(
    (state) => state.menu.numberOfCapturePoints
  );
  const captureSphereRadius = useAppSelector(
    (state) => state.menu.captureSphereRadius
  );

  const setFileName = (fileName: string) => {
    dispatch(menuSlice.actions.setFileName(fileName));
  };

  const setShowBasePlane = (showBasePlane: boolean) => {
    dispatch(menuSlice.actions.setShowBasePlane(showBasePlane));
  };

  const setShowCapturePoints = (showCapturePoints: boolean) => {
    dispatch(menuSlice.actions.setShowCapturePoints(showCapturePoints));
  };

  return (
    <Card elevation={2} sx={{ height: "100%", p: 2 }}>
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Select a model
      </Typography>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Model</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={fileName}
          label="Age"
          onChange={(event) => setFileName(event.target.value as string)}
        >
          <MenuItem value={"ferrari.glb"}>Ferrari</MenuItem>
          <MenuItem value={"Duck.glb"}>Duck</MenuItem>
          <MenuItem value={"Avocado.glb"}>Avocado</MenuItem>
          <MenuItem value={"Fox.glb"}>Fox</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Visibility
      </Typography>

      <FormControlLabel
        value={showBasePlane}
        onChange={(event, value) => {
          setShowBasePlane(value);
        }}
        control={<Switch defaultChecked />}
        label="Show baseplane"
      />
      <FormControlLabel
        value={showCapturePoints}
        onChange={(event, value) => {
          setShowCapturePoints(value);
        }}
        control={<Switch />}
        label="Show capture points"
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Image capture
      </Typography>

      <Stack direction="row">
        <Stack spacing={2}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Capture point count
          </Typography>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={numberOfCapturePoints ?? 0}
            max={500}
            min={10}
            onChange={(event, value) => {
              if (typeof value === "number") {
                dispatch(menuSlice.actions.setNumberOfCapturePoints(value));
              }
            }}
          />
          <Typography variant="body1" sx={{ mr: 2 }}>
            Capture sphere radius
          </Typography>
          <Slider
            size="small"
            defaultValue={5}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={captureSphereRadius ?? 0}
            max={10}
            min={2}
            onChange={(event, value) => {
              if (typeof value === "number") {
                dispatch(menuSlice.actions.setCaptureSphereRadius(value));
              }
            }}
          />
        </Stack>
      </Stack>

      <Stack alignItems="stretch">
        <CaptureButton />
        <Stack
          direction="row"
          justifyContent="stretch"
          gap={1}
          sx={{ width: "100%" }}
        >
          <ImageViewer sx={{ width: "100%" }} />
          <ImageDownloader sx={{ width: "100%" }} />
        </Stack>
      </Stack>
    </Card>
  );
}
