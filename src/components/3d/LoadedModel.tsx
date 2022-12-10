import { useGLTF } from "@react-three/drei";
import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { Box3, Vector3 } from "three";

export function LoadedModel() {
  const fileName = useAppSelector((state) => state.menu.fileName);
  let location = window.location.href;
  if (location[location.length - 1] === "/") {
    location = location.slice(0, -1);
  }

  const rawModel = useGLTF(`${location}/assets/${fileName}`, true);
  const model = rawModel.scene;

  //Scale the model to fit in the unit cube
  // First, calculate the bounding box of the model
  const boundingBox = new Box3().setFromObject(model);

  // Next, calculate the dimensions of the bounding box
  const size = boundingBox.getSize(new Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);

  // Calculate the scaling factors to fit the model inside the unit cube
  const scale = 2.0 / maxDimension;

  // Apply the scaling to the model
  model.scale.set(scale, scale, scale);

  // Reposition the model so that its world 0,0,0 is at the bottom center of the unit cube
  const center = boundingBox.getCenter(new Vector3());
  model.position.x -= center.x * scale;
  //model.position.y -= center.y * scale;
  model.position.y -= (center.y - size.y / 2.0) * scale;
  model.position.z -= center.z * scale;

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
