import { Canvas, useThree } from '@react-three/fiber'
import {AxesHelper} from "./axesHelperCustom/axesHelper"
import {CustomCamera} from "./camera/camera"


export function BasicScene() {
  return (
    <Canvas camera={{ position: [4, 5, 5]}}>
      <CustomCamera/>
      <color args={ [ '#343a45' ] } attach="background" />
      <gridHelper
        args={[20, 20, '#ffffff']}
        position={[0, -0.01, 0]}
      />
      <AxesHelper width = {6} length = {2} />
    </Canvas>
  )
}
