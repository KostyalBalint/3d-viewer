import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { Scene, sRGBEncoding } from "three";
import { Lights } from "./Lights";
import { BasePlane } from "./BasePlane";
import { Controls } from "./Controls";
import { LoadedModel } from "./LoadedModel";
import { CapturePoints } from "./CapturePoints";
import { GenerateImages } from "./GenerateImages";

export const ThreeDView = () => {
  const sceneRef = useRef<Scene>(null);
  return (
    <Canvas
      gl={{
        antialias: true,
        outputEncoding: sRGBEncoding,
        pixelRatio: window.devicePixelRatio,
      }}
      camera={{ position: [-4, 1.8, -3] }}
    >
      <scene ref={sceneRef}>
        <Lights />

        <CapturePoints />
        <LoadedModel />

        <BasePlane />

        <GenerateImages />
        <Controls />
      </scene>
    </Canvas>
  );
};
