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
  <p>
  {`
    🔹 Dive Right Back In!
    Login to pick up where you left off and access your saved 3D creations.

    🔹 Just Browsing?
    Continue as a guest and explore our powerful 3D modeling tools. Remember, any progress won't be saved.

    🔹 Collaborate in Real-Time!
    Create, share, and collaborate on your 3D projects by sharing unique links with fellow creators.

    Happy Modeling! 🛠🌐

    `.replace(/\n\n+g/, '\n')
  }
  </p>
  <div className="w-full d-flex justify-center">
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Login
    </Button>
    <Button variant="secondary" onClick={() => console.log('Clicked!')}>
      Continue as Guest
    </Button>
  </div>
</div>))();

export default function Home() {

    const [ modalBody, setModalBody ] = useState<React.ReactElement | null>(welcomeBlock);
    const [ isWebGLAvailable, setIsWebGLAvailable ] = useState(false);  

    useEffect(() => {
     setIsWebGLAvailable(WebGL.isWebGLAvailable());
    //  testSupabase()
    }, []);

  return (
    <>

        { modalBody && (
          <Modal
            title   = "Welcome to Knell Labs"
            isOpen  = { modalBody && true }
            onClose = { () => setModalBody(null) }
          >
            {modalBody}
          </Modal>
        )}
        
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden items-center justify-center">
            <BasicScene/>
        </div>

    </>
  );

}
