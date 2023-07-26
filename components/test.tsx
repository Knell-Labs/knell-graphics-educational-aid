import { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import * as THREE from 'three';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function ReactFiber() {
  return (
    <Canvas style={{ width: '800px', height: '600px' }}>
      <OrbitControls enableDamping = { false } />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <color args={ [ '#F5F5DC' ] } attach="background" />
    </Canvas>
  )
}

export function ThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    // Create a geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Render the scene
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      // Clean up resources if necessary
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export function AnimeExample() {
  const boxRef = useRef(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    anime({
      targets: boxElement,
      translateX: '200px',
      backgroundColor: '#00ff00',
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    });

    return () => {
      anime.remove(boxElement);
    };
  }, []);

  return (
    <div className="box" ref={boxRef}>
      Anime.js Example
    </div>
  );
};


