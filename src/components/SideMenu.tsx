import { Button, Card, Divider, Typography } from "@mui/material";
import React from "react";

export function SideMenu() {
  return (
    <Card elevation={2} sx={{ height: "100%" }}>
      <Typography variant="h5" textAlign="center" sx={{ my: 2 }}>
        Upload a file
      </Typography>

      <Button variant="contained" sx={{ m: 2 }} component="label">
        Select File
        <input
          type="file"
          hidden
          onChange={({ target }) => console.log(target.files)}
        />
      </Button>

      <Divider />
    </Card>
  );
}
