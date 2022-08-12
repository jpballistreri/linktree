import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          console.log("esta registrado!!!!");
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            console.log("completado");
            console.log(userInfo);
            onUserLoggedIn(userInfo);
          } else {
            console.log("no completado");
            onUserNotRegistered(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
}
