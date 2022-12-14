import { generateCapturePoints } from "../../utils/GenerateCapturePoints";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Euler,
  Matrix4,
  PerspectiveCamera,
  Vector2,
  WebGLRenderer,
} from "three";
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
    renderer.getSize(size); // Size of the rendered images
    dispatch(
      imagesSlice.actions.setTransforms({
        camera_angle_x: camera.fov * (Math.PI / 180), //Camera fov in degrees
        camera_angle_y: camera.fov * (Math.PI / 180), //Camera fov in degrees
        fl_x: size.x * (camera.getFocalLength() / 35), //Focal length in pixels  (35 mm is the default three JS camera sensor size)
        fl_y: size.y * (camera.getFocalLength() / 35), //Focal length in pixels
        k1: 0, //Distortion coefficients - not used
        k2: 0,
        p1: 0,
        p2: 0,
        cx: size.x / 2, //Center of projection in pixels
        cy: size.y / 2, //Center of projection in pixels
        w: size.x, //Image width in pixels
        h: size.y, //Image height in pixels
        aabb_scale: 4, //Scale of the bounding box around the model, this will be the box, where the rays will be cast
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
        alpha: true,
      });
      renderer.setSize(800, 800);
      renderer.setClearColor(0xffffff, 0);

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

          camera.updateMatrix();

          addFrame(fileName, getCameraMatrixTransforms(camera));
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

function getCameraMatrixTransforms(camera: PerspectiveCamera): number[] {
  //Get the Three JS camera matrix
  let matrix = camera.matrix.clone();

  //The matrix represents a rotation of -90 degrees about the x and y axes in 3D space
  const wordRotate = new Matrix4().makeRotationFromEuler(
    new Euler().set(-Math.PI / 2, -Math.PI / 2, 0, "ZYX")
  );

  //Apply the world orientation
  matrix.premultiply(wordRotate.clone().invert()).multiply(wordRotate);

  const mtx = matrix.toArray();

  //Rearrange the matrix columns to match the instant NGP convention
  //Three JS to instant NGP
  //X -> Z
  //Y -> X
  //Z -> Y
  return [
    mtx[4],
    mtx[5],
    mtx[6],
    mtx[7],

    mtx[8],
    mtx[9],
    mtx[10],
    mtx[11],

    mtx[0],
    mtx[1],
    mtx[2],
    mtx[3],

    mtx[12],
    mtx[13],
    mtx[14],
    mtx[15],
  ];
}
