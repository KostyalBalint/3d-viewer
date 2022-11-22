import { Vector3 } from "three";

export function generateCapturePoints(
  count: number | null,
  radius: number | null
) {
  const samples = count ?? 0;
  //Fibonacci sphere algorithm
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

  return points.map((point) => {
    return {
      center: point.multiplyScalar(radius ?? 1),
      dir: point.clone().normalize().multiplyScalar(-1),
    };
  });
}
