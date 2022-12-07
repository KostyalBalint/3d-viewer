import { Matrix3, Matrix4, Vector3 } from "three";

export const MatrixHelper = ({
  matrix,
  length = 0.2,
  hex,
}: {
  matrix: Matrix4;
  length?: number;
  hex?: number;
}) => {
  //Get the rotation matrix from the camera matrix
  const rotationMatrix = new Matrix3().setFromMatrix4(matrix);

  const dirX = new Vector3(1, 0, 0).applyMatrix3(rotationMatrix); //X
  const dirY = new Vector3(0, 1, 0).applyMatrix3(rotationMatrix); //Y
  const dirZ = new Vector3(0, 0, 1).applyMatrix3(rotationMatrix); //Z

  const position = new Vector3().setFromMatrixPosition(matrix);

  return (
    <>
      <arrowHelper
        args={[dirX, position, length, hex || 0xff0000]} //X -> Red
        key={position.x + position.y + position.z + "X"}
      />
      <arrowHelper
        args={[dirY, position, length, hex || 0x00ff00]} //Y -> Green
        key={position.x + position.y + position.z + "Y"}
      />
      <arrowHelper
        args={[dirZ, position, length, hex || 0x0000ff]} //Z -> Blue
        key={position.x + position.y + position.z + "Z"}
      />
    </>
  );
};
