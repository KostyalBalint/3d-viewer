import { Euler, Quaternion, Vector3 } from "three";
import { useAppSelector } from "../hooks/hooks";

export const CamPathPoints = () => {
  const camPathPoints = useAppSelector((state) => state.camPath.path).map(
    (point) => {
      const quaternion = new Quaternion(
        point.R[0],
        point.R[1],
        point.R[2],
        point.R[3]
      );
      const euler = new Euler().setFromQuaternion(quaternion, "XYZ");

      const position = new Vector3(point.T[0], point.T[1], point.T[2]);
      return {
        center: position,
        dir: new Vector3().setFromEuler(euler),
      };
    }
  );
  const showCamPoints = useAppSelector((state) => state.menu.showCamPoints);

  const length = 1;
  const hex = 0x0000ff;

  return (
    <>
      {showCamPoints &&
        camPathPoints.map((point) => (
          <arrowHelper
            args={[point.dir, point.center, length, hex]}
            key={point.center.x + point.center.y + point.center.z}
          />
        ))}
    </>
  );
};
