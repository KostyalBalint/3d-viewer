import React from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { SideMenu } from "./components/menu/SideMenu";
import { ThreeDView } from "./components/3d/ThreeDView";

function App() {
  return (
    <>
      <Grid
        container
        sx={{ width: "100vw", height: "100vh" }}
        justifyContent="stretch"
      >
        <Grid item xs={7} md={8} lg={9}>
          <ThreeDView />
        </Grid>
        <Grid item xs={5} md={4} lg={3}>
          <SideMenu />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
