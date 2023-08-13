import * as THREE from 'three'
import { memo, useRef, forwardRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Grid, Center, AccumulativeShadows, RandomizedLight, Environment, useGLTF, CameraControls } from '@react-three/drei'
import { suspend } from 'suspend-react'
import { OrbitControls, Line } from '@react-three/drei'

import {AxesHelper} from "./axesHelperCustom/axesHelper"


export function BasicScene() {
  return (
    <Canvas>
      <OrbitControls enableDamping = { false } />
      <color args={ [ '#343a45' ] } attach="background" />
      <Ground/>
      <AxesHelper width = {6} length = {2} />
    </Canvas>
  )
}

function Ground() {
  const gridConfig = {
    cellThickness: 0.5,
    cellColor: '#ffffff',
    sectionSize: 2,
    sectionThickness: 1,
    sectionColor: '##ffffff',
    fadeDistance: 20,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}
