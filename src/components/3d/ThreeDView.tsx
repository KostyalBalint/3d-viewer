import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { ACESFilmicToneMapping, Scene, sRGBEncoding } from "three";
import { Lights } from "./Lights";
import { BasePlane } from "./BasePlane";
import { Controls } from "./Controls";
import { LoadedModel } from "./LoadedModel";
import { CapturePoints } from "./CapturePoints";
import { CaptureImages } from "./CaptureImages";

export const ThreeDView = () => {
  const sceneRef = useRef<Scene>(null);
  return (
    <Canvas
      gl={{
        antialias: true,
        outputEncoding: sRGBEncoding,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
        pixelRatio: window.devicePixelRatio,
      }}
      camera={{ position: [-4, 1.8, -3] }}
    >
      <scene ref={sceneRef}>
        <Lights />

        <CapturePoints />
        <LoadedModel />

        <BasePlane />

        <CaptureImages />
        <Controls />
      </scene>
    </Canvas>
  );
};
