import { generateCapturePoints } from "../../utils/GenerateCapturePoints";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { OrthographicCamera, PerspectiveCamera, WebGLRenderer } from "three";
import { useThree } from "@react-three/fiber";
import { imagesSlice } from "../../store/imagesSlice";
import { useEffect } from "react";
import { menuSlice } from "../../store/menuSlice";

const useCamera = () => {
  const camType = useAppSelector((state) => state.menu.cameraType);
  const perspectiveCamera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  const camSize = 5;
  const orthographicCamera = new OrthographicCamera(
    camSize / -2,
    camSize / 2,
    camSize / 2,
    camSize / -2,
    1,
    1000
  );

  return camType === "perspective" ? perspectiveCamera : orthographicCamera;
};

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
  const camera = useCamera();

  useEffect(() => {
    if (isCapturing) {
      const points = generateCapturePoints(pointCount, captureSphereRadius);

      const renderer = new WebGLRenderer({
        antialias: true,
      });
      renderer.setSize(400, 400);

      dispatch(imagesSlice.actions.clearImages());
      points.forEach((point, index) => {
        //Move the camera to the point

        if (scene) {
          camera.position.set(point.center.x, point.center.y, point.center.z);
          camera.lookAt(point.dir.x, point.dir.y, point.dir.z);
          //Render the scene
          renderer.render(scene, camera);
          //Save the image
          renderer.domElement.toBlob(
            (blob) => {
              if (blob) {
                dispatch(
                  imagesSlice.actions.addImage({
                    uri: URL.createObjectURL(blob),
                    name: `image_${index}.png`,
                  })
                );
              }
            },
            "image/png",
            1.0
          );
        }
      });
      dispatch(menuSlice.actions.setIsCapturing(false));
    }
    // eslint-disable-next-line
  }, [isCapturing]);

  return <></>;
};
