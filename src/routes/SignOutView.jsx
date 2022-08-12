import React from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { logout } from "../firebase/firebase";

export default function SignOutView() {
  const navigate = useNavigate();

  const handleUserLoggedIn = async (user) => {
    await logout();
    window.location.reload();
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => navigate("/login");

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    ></AuthProvider>
  );
}
