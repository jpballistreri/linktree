import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function LoginView() {
  const [currentUser, setCurrentUser] = useState(null);

  /* State
0: inicializando
1: loading
2:loginCompleto
3:login sin registro
4:no hay nadie logueado
*/
  const [state, setCurrentState] = useState(0);

  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      const isRegistered = await userExist(user.uid);
      if (isRegistered) {
        //Redirigir a dashboard
        setCurrentState(2);
      } else {
        //Redirigir a choose username
        setCurrentState(3);
      }
    } else {
      setCurrentState(4);
      console.log("No hay nadie autenticado");
    }
  };

  const handleOnClick = () => {
    const signInWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    const googleProvider = new GoogleAuthProvider();
    signInWithGoogle(googleProvider);
  };

  if (state === 1) {
    return <div>Loading</div>;
  }

  if (state === 2) {
    return <div>Login completo</div>;
  }

  if (state === 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }

  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }
}
