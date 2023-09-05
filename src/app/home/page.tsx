"use client"
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import { BasicScene }  from "../../../components/basicScene";
import Button from '../../../components/ui/button';
import { CameraSwitch } from "../../../components/ui/button/cameraSwitch";
import LoginForm from '../../../components/forms/login';
import CreateUserForm from '../../../components/forms/createUser';
import Modal from '../../../components/modal';
import { ThreeScene, AnimeExample, ReactFiber  } from "../../../components/test";
import Welcome from './welcome';

export default function Home() {

    const [ modalBody, setModalBody ] = useState<React.ReactElement | null>(null);
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const setModalWelcome = () => {
      const handleWelcomeAction = ( action: "create" | "login" | "" ) => {
        switch (action) {
          case "create": {
            setModalBody(
              <div className="flex">
                <Button size="small" onClick={setModalWelcome}>&#xab;</Button>
                <CreateUserForm />
              </div>
            );
            break;
          }
          case "login": {
            setModalBody(
              <div className="flex">
                <Button size="small" onClick={setModalWelcome}>&#xab;</Button>
                <LoginForm />
              </div>
            );
            break;
          }
          default:
            setShowModal(false);
        }
      }

      setModalBody(
        <Welcome 
          handleAction = { handleWelcomeAction }
        />
      )
    }

    useEffect(() => {
      setModalWelcome()
    }, [])
    useEffect(() => {
      setShowModal(!!modalBody)
    }, [modalBody])

    const [ isWebGLAvailable, setIsWebGLAvailable ] = useState(false);  

    useEffect(() => {
     setIsWebGLAvailable(WebGL.isWebGLAvailable());
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
        
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
            <BasicScene/>
        </div>

    </>
  );

}
