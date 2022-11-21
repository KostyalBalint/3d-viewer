import { Plane } from "@react-three/drei";
import React from "react";
import { DoubleSide } from "three";

export function BasePlane() {
  const size = 100;
  return (
    <>
      <gridHelper args={[size, size]} position={[0, -0.01, 0]}>
        <meshBasicMaterial color="gray" side={DoubleSide} />
      </gridHelper>
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        args={[size, size]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </>
  );
}
