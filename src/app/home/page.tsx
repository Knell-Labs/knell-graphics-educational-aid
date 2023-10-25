"use client"
import { useState, useEffect } from 'react';

import { BasicScene }  from "../../../components/basicScene";
import Button from '../../../components/ui/button';
import LoginForm from '../../../components/forms/login';
import Modal from '../../../components/modal';
import Welcome from './welcome';

import { useAuth } from '../contexts/authProvider'

export default function Home() {
  const { session } = useAuth()
  useEffect(() => {
    console.log(session)
  }, [session])
  const [ modalBody, setModalBody ] = useState<React.ReactElement | null>(null);
  const [ showModal, setShowModal ] = useState<boolean>(false);

  const setModalWelcome = () => {
    const handleWelcomeAction = ( action: "create" | "login" | "" ) => {
      switch (action) {
        case "login": {
          setModalBody(
            <div className="flex gap-3">
              <Button size="small" onClick={setModalWelcome}>&#xab;</Button>
              <div className="flex-1">
                <LoginForm />
              </div>
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
