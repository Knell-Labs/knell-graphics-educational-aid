"use client"
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import { BasicScene }  from "../components/basicScene";
import { CameraSwitch } from "../components/ui/button/cameraSwitch";
import Modal from '../components/modal';
import Button from '../components/ui/button';
import { ThreeScene, AnimeExample, ReactFiber  } from "../components/test";

const welcomeBlock = (() => (<div>
  <p className="my-2">
    <span className="font-medium text-lg">{"🔹 Dive Right Back In!\n"}</span>
    {"Login to pick up where you left off and access your saved 3D creations.\n\n"}
    <span className="font-medium text-lg">{"🔹 Just Browsing?\n"}</span>
    {"Continue as a guest and explore our powerful 3D modeling tools. Remember, any progress won't be saved.\n\n"}
    <span className="font-medium text-lg">{"🔹 Collaborate in Real-Time!\n"}</span>
    {"Create, share, and collaborate on your 3D projects by sharing unique links with fellow creators.\n\n"}
    <span className="font-bold text-xl">{"Happy Modeling! 🛠🌐"}</span>
  </p>
  <div className="w-full flex justify-around gap-2">
    <Button variant="primary" fullWidth onClick={() => console.log('Clicked!')}>
      Login
    </Button>
    <Button variant="secondary" fullWidth onClick={() => console.log('Clicked!')}>
      Continue as Guest
    </Button>
  </div>
</div>))();

export default function Home() {

    const [ modalBody, setModalBody ] = useState<React.ReactElement | null>(null);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    useEffect(() => {
      setModalBody(welcomeBlock)
    }, [])
    useEffect(() => {
      setShowModal(!!modalBody)
    }, [modalBody])

    const [ isWebGLAvailable, setIsWebGLAvailable ] = useState(false);  

    useEffect(() => {
     setIsWebGLAvailable(WebGL.isWebGLAvailable());
    //  testSupabase()
    }, []);

  return (
    <>

        
        <Modal
          title   = "Welcome to Knell Labs"
          isOpen  = { showModal }
          onClose = { () => setShowModal(false) }
        >
          {modalBody}
        </Modal>
        
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden items-center justify-center">
            <BasicScene/>
        </div>

    </>
  );

}
