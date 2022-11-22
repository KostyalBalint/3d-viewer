import { generateCapturePoints } from "../../utils/GenerateCapturePoints";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { PerspectiveCamera, WebGLRenderer } from "three";
import { useThree } from "@react-three/fiber";
import { imagesSlice } from "../../store/imagesSlice";
import { useEffect } from "react";
import { menuSlice } from "../../store/menuSlice";

export const CaptureImages = () => {
  const { scene } = useThree();
  const dispatch = useAppDispatch();
  const pointCount = useAppSelector(
    (state) => state.menu.numberOfCapturePoints
  );
  const captureSphereRadius = useAppSelector(
    (state) => state.menu.captureSphereRadius
  );
  const isCapturing = useAppSelector((state) => state.menu.isCapturing);

  useEffect(() => {
    if (isCapturing) {
      const points = generateCapturePoints(pointCount, captureSphereRadius);

      const camera = new PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      const renderer = new WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(400, 400);

      dispatch(imagesSlice.actions.clearImages());
      points.forEach((point) => {
        //Move the camera to the point
        if (scene) {
          new Promise(() => {
            camera.position.set(point.center.x, point.center.y, point.center.z);
            camera.lookAt(point.dir.x, point.dir.y, point.dir.z);
            //Render the scene
            renderer.render(scene, camera);
            //Save the image
            renderer.domElement.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  dispatch(imagesSlice.actions.addImage(url));
                }
              },
              "image/png",
              1.0
            );
          });
        }
      });
      dispatch(menuSlice.actions.setIsCapturing(false));
    }
    // eslint-disable-next-line
  }, [isCapturing]);

  return <></>;
};
