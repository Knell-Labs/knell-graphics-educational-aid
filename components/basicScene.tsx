import { Canvas } from '@react-three/fiber'
import {AxesHelper} from "./axesHelperCustom/axesHelper"
import {CustomCamera} from "./camera/camera"
import {Overlay} from "./ui/buttons/cameraSwitch"
import { Html } from '@react-three/drei'

export function BasicScene() {
  return (
    <>
        <Canvas camera={{ position: [4, 5, 5]}}>
          <CustomCamera/>
          <color args={ [ '#343a45' ] } attach="background" />
          <gridHelper
            args={[20, 20, '#ffffff']}
            position={[0, -0.01, 0]}
          />
          <AxesHelper width = {6} length = {2} />
        </Canvas>
    </>
  )
}
