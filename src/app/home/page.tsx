"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react';

import { BasicScene }  from "../../../components/basicScene";
import Button from '../../../components/ui/button';
import LoginForm from '../../../components/forms/login';
import CreateUserForm from '../../../components/forms/createUser';
import Modal from '../../../components/modal';
import Welcome from './welcome';

import { LoginFormType } from '../../types/auth'

export default function Home() {

  const supabase = createClientComponentClient()

  const handleSignUp = (form:LoginFormType) => {
    supabase.auth.signUp({
      email:    form.email,
      password: form.email
    })
  }
  const handleSignIn = (form:LoginFormType) => {
    supabase.auth.signInWithPassword({
      email:    form.email,
      password: form.email
    })
  }
  const handleSignOut = () => {
    supabase.auth.signOut()
  }
  
  const [ modalBody, setModalBody ] = useState<React.ReactElement | null>(null);
  const [ showModal, setShowModal ] = useState<boolean>(false);

  const setModalWelcome = () => {
    const handleWelcomeAction = ( action: "create" | "login" | "" ) => {
      switch (action) {
        case "create": {
          setModalBody(
            <div className="flex">
              <Button size="small" onClick={setModalWelcome}>&#xab;</Button>
              <CreateUserForm
                // handleSubmit={handleSignUp}
              />
            </div>
          );
          break;
        }
        case "login": {
          setModalBody(
            <div className="flex">
              <Button size="small" onClick={setModalWelcome}>&#xab;</Button>
              <LoginForm
                handleSubmit={handleSignIn}
              />
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
