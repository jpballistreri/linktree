import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { existsUsername, updateUser } from "../firebase/firebase";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUserName] = useState("");

  const handleUserLoggedIn = (user) => navigate("/dashboard");

  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setCurrentState(3);
  };

  const handleUserNotLoggedIn = () => navigate("/login");

  const handleInputUsername = (e) => {
    setUserName(e.target.value);
  };

  const handleContinue = async () => {
    setCurrentState(0);
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setCurrentState(5);
      } else {
        const tmp = {
          ...currentUser,
          processCompleted: true,
          username: username,
        };
        await updateUser(tmp);
        setCurrentState(6);
      }
    }
  };

  if (currentState === 3 || currentState === 5) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {currentState === 5 && (
          <p>El nombre de usuario ya existe, escoge otro.</p>
        )}

        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>

        <div>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  }

  if (currentState === 6) {
    return (
      <div>
        <h1>Felicidades, ya puedes ir al dashboard a crear tus links</h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      Loading...
    </AuthProvider>
  );
}
