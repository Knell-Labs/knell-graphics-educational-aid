"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthChangeEvent } from "@supabase/supabase-js";

import { useAuth } from "../contexts/authProvider";

import Scene from "../../components/scene";

import Button from "../../components/ui/button";
import LoginForm from "../../components/forms/login";
import Modal from "../../components/modal";
import Welcome from "./welcome";

export default function Home() {
  const { session } = useAuth();
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
        handleModalAction("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const [modalBody, setModalBody] = useState<React.ReactElement | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const setModalWelcome = () => {
    setModalBody(
      <Welcome hasSession={!!session} handleAction={handleModalAction} />,
    );
  };

  const handleModalAction = (action: "create" | "login" | "") => {
    switch (action) {
      case "login": {
        setModalBody(
          <div className="flex gap-3">
            <Button size="small" onClick={setModalWelcome}>
              &#xab;
            </Button>
            <div className="flex-1">
              <LoginForm />
            </div>
          </div>,
        );
        break;
      }
      default:
        setShowModal(false);
    }
  };

  useEffect(() => {
    setModalWelcome();
  }, []);

  useEffect(() => {
    setShowModal(!!modalBody);
  }, [modalBody]);

  return (
    <>
      <Modal
        title="Welcome to Knell Labs"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        {modalBody}
      </Modal>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <Scene
          session={session}
          handleShowLoginForm={() => handleModalAction("login")}
          handleLogout={() => supabase.auth.signOut()}
        />
      </div>
    </>
  );
}
