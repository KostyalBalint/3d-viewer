import { Canvas } from "@react-three/fiber";
import React from "react";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import { Lights } from "./Lights";
import { BasePlane } from "./BasePlane";
import { Controls } from "./Controls";
import { LoadedModel } from "./LoadedModel";

export const ThreeDView = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        outputEncoding: sRGBEncoding,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
        pixelRatio: window.devicePixelRatio,
      }}
    >
      <scene>
        <Lights />

        <LoadedModel />

        <BasePlane />

        <Controls />
      </scene>
    </Canvas>
  );
};
