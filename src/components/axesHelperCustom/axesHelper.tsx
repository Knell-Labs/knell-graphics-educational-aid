import { Line } from "@react-three/drei";

type AxesHelperParams = {
  width: number;
  length: number;
};

export function AxesHelper({ width, length }: AxesHelperParams) {
  return (
    <>
      <group name="axes-helper">
        <Line
          points={[
            [0, 0, 0],
            [length, 0, 0],
          ]}
          color="red"
          lineWidth={width}
        />
        <Line
          points={[
            [0, 0, 0],
            [0, length, 0],
          ]}
          color="green"
          lineWidth={width}
        />
        <Line
          points={[
            [0, 0, 0],
            [0, 0, length],
          ]}
          color="blue"
          lineWidth={width}
        />
      </group>
    </>
  );
}
