import {
  Button,
  Card,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { menuSlice } from "../../store/menuSlice";
import { NumberField } from "../NumberField";
import { CaptureButton } from "../CaptureButton";
import { ImageViewer } from "../ImageViewer";
import { ImageDownloader } from "../ImageDownloader";
import { CameraSettings } from "./CameraSettings";

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
        Load a file
      </Typography>

      <Button variant="contained" component="label">
        Select File
        <input
          type="file"
          hidden
          accept=".glb, .gltf"
          onChange={({ target }) =>
            target.files && target.files[0] && setFileName(target.files[0].name)
          }
        />
      </Button>

      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        {fileName}
      </Typography>

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

      <NumberField
        sx={{ my: 1 }}
        label="Number of capture points"
        onChange={(value) => {
          dispatch(menuSlice.actions.setNumberOfCapturePoints(value ?? null));
        }}
        value={numberOfCapturePoints}
      />
      <NumberField
        sx={{ my: 1 }}
        label="Capture sphere radius"
        onChange={(value) => {
          dispatch(menuSlice.actions.setCaptureSphereRadius(value ?? null));
        }}
        value={captureSphereRadius}
      />

      <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
        Camera settings
      </Typography>
      <CameraSettings />

      <Stack alignItems="stretch">
        <CaptureButton />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <ImageViewer />
          <ImageDownloader />
        </Stack>
      </Stack>
    </Card>
  );
}
