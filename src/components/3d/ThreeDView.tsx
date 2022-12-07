import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { Scene, sRGBEncoding, Vector3 } from "three";
import { Lights } from "./Lights";
import { BasePlane } from "./BasePlane";
import { Controls } from "./Controls";
import { LoadedModel } from "./LoadedModel";
import { CapturePoints } from "./CapturePoints";
import { GenerateImages } from "./GenerateImages";
import { CamPathPoints } from "./CamPathPoints";

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
        <CamPathPoints />

        <CapturePoints />
        <LoadedModel />

        <BasePlane />

        <GenerateImages />
        <Controls />

        {/*false && (
                <arrowHelper
                    args={[new Vector3(1, 0, 0), new Vector3(0, 0, 0), 1, 0xff0000]} //X -> Red
                />
                <arrowHelper
                args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 1, 0x00ff00]} //Y -> Green
                />
                <arrowHelper
                args={[new Vector3(0, 0, 1), new Vector3(0, 0, 0), 1, 0x0000ff]} //Z -> Blue
                />
            )*/}
      </scene>
    </Canvas>
  );
};
