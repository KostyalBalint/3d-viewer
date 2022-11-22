import { useGLTF } from "@react-three/drei";
import React from "react";
import { useAppSelector } from "../hooks/hooks";

export function LoadedModel() {
  const fileName =
    useAppSelector((state) => state.menu.fileName) || "/assets/ferrari.glb";
  const rawModel = useGLTF(fileName, true);
  const model = rawModel.scene;

  return (
    <>
      {model && (
        <group position={[0, 0, 0]}>
          <primitive object={model} />
        </group>
      )}
    </>
  );
}
