import { Object3D, Vector3 } from "three";
import { useAppSelector } from "../hooks/hooks";
import { generateCapturePoints } from "../../utils/GenerateCapturePoints";
import { MatrixHelper } from "./MatrixHelper";

export const CapturePoints = () => {
  const count = useAppSelector((state) => state.menu.numberOfCapturePoints);
  const radius = useAppSelector((state) => state.menu.captureSphereRadius);
  const showCapturePoints = useAppSelector(
    (state) => state.menu.showCapturePoints
  );
  const isCapturing = useAppSelector((state) => state.menu.isCapturing);

  const arrows: { center: Vector3; dir: Vector3 }[] = generateCapturePoints(
    count,
    radius
  );

  const length = 1;

  return (
    <>
      {showCapturePoints &&
        !isCapturing &&
        arrows.map((arrow) => {
          const camera = new Object3D();
          camera.position.set(arrow.center.x, arrow.center.y, arrow.center.z);
          console.log(arrow.dir);
          camera.lookAt(arrow.dir.x, arrow.dir.y, arrow.dir.z);
          camera.updateMatrix();

          return <MatrixHelper matrix={camera.matrix} length={length} />;
        })}
    </>
  );
};
