import { generateCapturePoints } from "../../utils/GenerateCapturePoints";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { PerspectiveCamera, Vector2, WebGLRenderer } from "three";
import { useThree } from "@react-three/fiber";
import { imagesSlice } from "../../store/imagesSlice";
import { useEffect } from "react";
import { menuSlice } from "../../store/menuSlice";

const useCamera = () => {
  const perspectiveCamera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  return perspectiveCamera;
};

export const GenerateImages = () => {
  const { scene } = useThree();
  const dispatch = useAppDispatch();
  const setCameraTransforms = (
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) => {
    const size = new Vector2();
    renderer.getSize(size);
    dispatch(
      imagesSlice.actions.setTransforms({
        camera_angle_x: camera.fov * (Math.PI / 180),
        camera_angle_y: camera.fov * (Math.PI / 180),
        fl_x: 1375.52,
        fl_y: 1374.49,
        k1: 0.0578421,
        k2: 0.0805099,
        p1: 0.000980296,
        p2: 0.00015575,
        cx: 554.558,
        cy: 965.268,
        w: size.x,
        h: size.y,
        aabb_scale: 4,
      })
    );
  };
  const addFrame = (filePath: string, cameraMatrix: number[]) => {
    //Convert 16 element array to 4x4 matrix
    //Transpose the matrix
    const cameraMatrix4x4: number[][] = [
      [cameraMatrix[0], cameraMatrix[4], cameraMatrix[8], cameraMatrix[12]],
      [cameraMatrix[1], cameraMatrix[5], cameraMatrix[9], cameraMatrix[13]],
      [cameraMatrix[2], cameraMatrix[6], cameraMatrix[10], cameraMatrix[14]],
      [cameraMatrix[3], cameraMatrix[7], cameraMatrix[11], cameraMatrix[15]],
    ];

    dispatch(
      imagesSlice.actions.addFrame({
        file_path: filePath,
        sharpness: 30,
        transform_matrix: cameraMatrix4x4,
      })
    );
  };
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
      renderer.setSize(800, 800);
      renderer.setClearColor(0xffffff, 1);

      setCameraTransforms(camera, renderer);

      dispatch(imagesSlice.actions.clearImages());
      points.forEach((point, index) => {
        //Move the camera to the point
        if (scene) {
          const fileName = `image_${index
            .toString()
            .padStart(points.length.toString().length, "0")}.png`;
          camera.position.set(point.center.x, point.center.y, point.center.z);
          //Y -> UP
          //Z -> FORWARD
          camera.lookAt(point.dir.x, point.dir.y, point.dir.z);
          //Render the scene
          renderer.render(scene, camera);

          //TODO: 1.st try: only the z is flipped
          camera.lookAt(point.dir.x, point.dir.y, point.dir.z * -1);

          addFrame(fileName, camera.matrix.toArray());
          //Save the image
          renderer.domElement.toBlob(
            (blob) => {
              if (blob) {
                dispatch(
                  imagesSlice.actions.addImage({
                    uri: URL.createObjectURL(blob),
                    name: fileName,
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
