import { useAppSelector } from "../hooks/hooks";
import { Euler, Matrix3, Matrix4, Vector3 } from "three";
import { MatrixHelper } from "./MatrixHelper";

export const CamPathPoints = () => {
  const showCamPoints = useAppSelector((state) => state.menu.showCamPoints);
  const camPoints = useAppSelector((state) => state.images.transforms.frames);

  const length = 0.4;
  const hex = 0x0000ff;

  return (
    <>
      {showCamPoints &&
        camPoints.map((point) => {
          const mat = point.transform_matrix.reduce((a, b) => a.concat(b), []);
          let matrix = new Matrix4().set(
            mat[0],
            mat[1],
            mat[2],
            mat[3],

            mat[4],
            mat[5],
            mat[6],
            mat[7],

            mat[8],
            mat[9],
            mat[10],
            mat[11],

            mat[12],
            mat[13],
            mat[14],
            mat[15]
          );

          const columns = matrix.toArray();

          matrix = new Matrix4().fromArray([
            -columns[8],
            -columns[9],
            -columns[10],
            -columns[11],

            columns[0],
            columns[1],
            columns[2],
            columns[3],

            -columns[4],
            -columns[5],
            -columns[6],
            -columns[7],

            columns[12],
            columns[13],
            columns[14],
            columns[15],
          ]);

          const wordRotate = new Matrix4().makeRotationFromEuler(
            new Euler(Math.PI / 2, Math.PI / 2, 0)
          );

          matrix.premultiply(wordRotate.clone().invert()).multiply(wordRotate);

          return <MatrixHelper matrix={matrix} />;
        })}
    </>
  );
};
/*
const camPoints: {
  file_path: string;
  sharpness: number;
  transform_matrix: number[][];
}[] = [
  {
    file_path: "image_00.png",
    sharpness: 30,
    transform_matrix: [
      [1, 0, 0, 0],
      [0, 0.00009999999949994454, 0.999999995, 5],
      [0, -0.999999995, 0.00009999999949994454, 0],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_01.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.6754902942615237, 0.6597511014384967, -0.3293043372158505,
        -1.646521686079252,
      ],
      [
        5.551115123125783e-17, 0.4465937565388721, 0.8947368421052632,
        4.473684210526316,
      ],
      [
        0.7373688780783197, -0.6043860527603108, 0.30166974801980195,
        1.5083487400990103,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_02.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.9961710408648279, -0.06902030898707359, 0.05366054686279797,
        0.2683027343139899,
      ],
      [
        -6.938893903907228e-18, 0.6137844099837158, 0.7894736842105264,
        3.947368421052632,
      ],
      [
        -0.08742572471695986, 0.7864508217353904, -0.6114342545600824,
        -3.0571712728004115,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_03.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.7936007512916959, -0.41630027330132713, 0.4437250612693588,
        2.2186253063467936,
      ],
      [
        5.551115123125783e-17, 0.7292845505553167, 0.6842105263157896,
        3.4210526315789473,
      ],
      [
        -0.6084388609788628, -0.5429899877258972, 0.5787607672261261,
        2.893803836130631,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_04.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.1741819503793116, 0.5700972809720903, -0.8029008272447403,
        -4.014504136223702,
      ],
      [
        1.1102230246251565e-16, 0.8153649149910351, 0.5789473684210527,
        2.8947368421052633,
      ],
      [
        0.9847134853154286, 0.10084218179854879, -0.14202185116400012,
        -0.7101092558200006,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_05.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.5367280526263225, -0.3996735607006092, 0.7430908708905337,
        3.715454354452668,
      ],
      [
        2.7755575615628914e-17, 0.8806947647727111, 0.4736842105263158,
        2.368421052631579,
      ],
      [
        -0.8437552948123972, 0.2542396038756265, -0.4726935860546544,
        -2.3634679302732726,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_06.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.9657150743757783, 0.09564369127949575, -0.2413434885009693,
        -1.2067174425048468,
      ],
      [
        -1.3877787807814457e-17, 0.929659038560826, 0.368421052631579,
        1.842105263157895,
      ],
      [
        0.25960430490148845, -0.3557897642437078, 0.8977857475678827,
        4.488928737839413,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_07.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.8874484292452547, 0.12129132229299186, -0.4446613324391361,
        -2.2233066621956805,
      ],
      [
        6.938893903907228e-18, 0.96475277788544, 0.26315789473684204,
        1.3157894736842106,
      ],
      [
        0.4609070247133692, 0.2335390603276985, -0.8561683373444298,
        -4.280841686722149,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_08.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.34303863087410225, -0.1483138888932818, 0.9275384024876667,
        4.637692012438334,
      ],
      [
        4.163336342344337e-17, 0.9874559494365115, 0.15789473684210528,
        0.7894736842105265,
      ],
      [
        -0.939321296324118, -0.054163994348542445, 0.3387355369431876,
        1.6936776847159372,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_09.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.3815564084749362, 0.04864976611251609, -0.9230644113001568,
        -4.615322056500784,
      ],
      [
        3.469446951953614e-18, 0.9986139979479093, 0.052631578947368474,
        0.26315789473684237,
      ],
      [
        0.9243455561378048, -0.02008191623552298, 0.3810275705098016,
        1.9051378525490081,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_10.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.9057342725556132, 0.02230768394989001, 0.42325854362900384,
        2.1162927181450195,
      ],
      [
        -1.734723475976807e-18, 0.9986139979479093, -0.05263157894736835,
        -0.2631578947368418,
      ],
      [
        -0.42384599504791065, -0.04767022487134802, -0.9044789229952022,
        -4.5223946149760135,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_11.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.954164120307897, 0.04725534701761151, 0.29552963251644015,
        1.477648162582201,
      ],
      [
        -6.938893903907228e-18, 0.9874559494365115, -0.15789473684210528,
        -0.7894736842105265,
      ],
      [
        -0.29928386444487287, 0.15065749268019427, 0.9421950373368883,
        4.710975186684442,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_12.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.5014075812324266, -0.22768716046137621, -0.8347149180670506,
        -4.173574590335253,
      ],
      [
        1.3877787807814457e-17, 0.96475277788544, -0.26315789473684204,
        -1.3157894736842102,
      ],
      [
        0.8652112097532298, -0.13194936348221747, -0.4837343568468029,
        -2.418671784234015,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_13.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.21471942904125751, 0.35982791659985436, 0.907975460696821,
        4.539877303484106,
      ],
      [
        -5.551115123125783e-17, 0.929659038560826, -0.368421052631579,
        -1.842105263157895,
      ],
      [
        -0.976675773628176, -0.07910715806783178, -0.19961585796282488,
        -0.9980792898141262,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_14.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.8180624302199665, -0.272429729592508, -0.5065134773100863,
        -2.532567386550432,
      ],
      [
        -2.7755575615628914e-17, 0.8806947647727111, -0.47368421052631565,
        -2.3684210526315788,
      ],
      [
        0.5751294291397393, 0.387503256419984, 0.7204632995519658,
        3.6023164977598294,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_15.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.9917081236973844, -0.07440092567310136, -0.10478310766339541,
        -0.523915538316977,
      ],
      [0, 0.8153649149910351, -0.5789473684210527, -2.8947368421052633],
      [
        0.12851068979899324, -0.5741468084563806, -0.8086040099744367,
        -4.043020049872184,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_16.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.6444469828838244, 0.5231808916278189, 0.5576466989837348,
        2.7882334949186744,
      ],
      [
        5.551115123125783e-17, 0.7292845505553168, -0.6842105263157894,
        -3.421052631578947,
      ],
      [
        -0.7646489954560429, 0.44093740934156395, 0.4699852282691599,
        2.3499261413457986,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_17.png",
    sharpness: 30,
    transform_matrix: [
      [
        0.04131782619737556, -0.7887995163215387, -0.6132602712464178,
        -3.0663013562320884,
      ],
      [
        1.6653345369377348e-16, 0.613784409983716, -0.7894736842105262,
        -3.947368421052632,
      ],
      [
        0.9991460540072824, 0.03261933647161208, 0.025360237574366007,
        0.12680118787182867,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_18.png",
    sharpness: 30,
    transform_matrix: [
      [
        -0.7053799411794164, 0.6342157917451609, 0.31655879087901095,
        1.5827939543950544,
      ],
      [0, 0.44659375653887246, -0.894736842105263, -4.473684210526315],
      [
        -0.7088294143034152, -0.6311294210552674, -0.31501827771848445,
        -1.5750913885924225,
      ],
      [0, 0, 0, 1],
    ],
  },
  {
    file_path: "image_19.png",
    sharpness: 30,
    transform_matrix: [
      [1, 0, 0, 0],
      [0, 0.00009999999949994454, -0.999999995, -5],
      [0, 0.999999995, 0.00009999999949994454, 0],
      [0, 0, 0, 1],
    ],
  },
];
*/