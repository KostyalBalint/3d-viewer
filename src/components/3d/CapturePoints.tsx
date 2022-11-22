import { Vector3 } from "three";
import { useAppSelector } from "../hooks/hooks";
import { generateCapturePoints } from "../../utils/GenerateCapturePoints";

export const CapturePoints = () => {
  const count = useAppSelector((state) => state.menu.numberOfCapturePoints);
  const radius = useAppSelector((state) => state.menu.captureSphereRadius);
  const showCapturePoints = useAppSelector(
    (state) => state.menu.showCapturePoints
  );

  const arrows: { center: Vector3; dir: Vector3 }[] = generateCapturePoints(
    count,
    radius
  );

  const length = 1;
  const hex = 0xff0000;

  return (
    <>
      {showCapturePoints &&
        arrows.map((arrow) => (
          <arrowHelper
            args={[arrow.dir, arrow.center, length, hex]}
            key={arrow.center.x + arrow.center.y + arrow.center.z}
          />
        ))}
    </>
  );
};
