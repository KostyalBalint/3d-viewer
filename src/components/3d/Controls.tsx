import React from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export function Controls() {
  return (
    <>
      <PerspectiveCamera far={100} position={[-4, 1.8, -3]} makeDefault />
      <OrbitControls
        enableDamping={true}
        maxPolarAngle={Math.PI}
        minDistance={10}
        maxDistance={30}
      />
    </>
  );
}
