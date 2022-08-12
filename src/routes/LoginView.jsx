import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExist } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import style from "./loginView.module.css";

export default function LoginView() {
  const navigate = useNavigate();

  //const [currentUser, setCurrentUser] = useState(null);

  /* State
0: inicializando
1: loading
2:loginCompleto
3:login sin registro
4:no hay nadie logueado
5:ya existe el username
6: nuevo username, click para continuar
7: username public profile no existe
*/
  const [state, setCurrentState] = useState(0);

  /* useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExist(user.uid);
        if (isRegistered) {
          navigate("/dashboard");
          setCurrentState(2);
        } else {
          navigate("/choose-username");
          setCurrentState(3);
        }
      } else {
        setCurrentState(4);
        console.log("No hay nadie autenticado");
      }
    });
  }, [navigate]); */

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

  const handleUserLoggedIn = (user) => navigate("/dashboard");

  const handleUserNotRegistered = (user) => navigate("/choose-username");

  const handleUserNotLoggedIn = () => setCurrentState(4);

  /* if (state === 1) {
    return <div>Loading</div>;
  }

  if (state === 2) {
    return <div>Login completo</div>;
  }

  if (state === 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }
*/
  if (state === 4) {
    return (
      <div className={style.loginView}>
        <div>
          <h1>linkTree</h1>
        </div>
        <button className={style.provider} onClick={handleOnClick}>
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
}
