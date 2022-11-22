import { Vector3 } from "three";
import { useAppSelector } from "../hooks/hooks";

const fibonacciSphere = (samples: number): Vector3[] => {
  const points: Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);

    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    points.push(new Vector3(x, y, z));
  }

  return points;
};

export const CapturePoints = () => {
  const count = useAppSelector((state) => state.menu.numberOfCapturePoints);
  const radius = useAppSelector((state) => state.menu.captureSphereRadius);

  const arrows: { center: Vector3; dir: Vector3 }[] = fibonacciSphere(
    count ?? 0
  ).map((point) => {
    return {
      center: point.multiplyScalar(radius ?? 1),
      dir: point.clone().normalize().multiplyScalar(-1),
    };
  });

  const length = 1;
  const hex = 0xff0000;

  return (
    <>
      {arrows.map((arrow) => (
        <arrowHelper
          args={[arrow.dir, arrow.center, length, hex]}
          key={arrow.center.x + arrow.center.y + arrow.center.z}
        />
      ))}
    </>
  );
};
