import {
  Button,
  Card,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { menuSlice } from "../store/menuSlice";

export function SideMenu() {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector((state) => state.menu.fileName);
  const showBasePlane = useAppSelector((state) => state.menu.showBasePlane);

  const setFileName = (fileName: string) => {
    dispatch(menuSlice.actions.setFileName(fileName));
  };

  const setShowBasePlane = (showBasePlane: boolean) => {
    dispatch(menuSlice.actions.setShowBasePlane(showBasePlane));
  };

  return (
    <Card elevation={2} sx={{ height: "100%", p: 2 }}>
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Upload a file
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

      <Divider />

      <FormControlLabel
        value={showBasePlane}
        onChange={(event, showBasePlane) => {
          setShowBasePlane(showBasePlane);
        }}
        control={<Switch defaultChecked />}
        label="Show baseplane"
      />
    </Card>
  );
}
