import React, { useState, useRef } from "react";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { useNavigate } from "react-router-dom";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";
import { updateCurrentUser } from "firebase/auth";
import { useEffect } from "react";
import style from "./editProfileView.module.css";

export default function EditProfileView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setCurrentState] = useState(0);
  const [profileUrl, setProfileUrl] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    const fetch = async () => {
      const url = await getProfilePhotoUrl(currentUser.profilePicture);
      setProfileUrl(url);
    };
    fetch();
  }, [currentUser, state]);

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    //const url = await getProfilePhotoUrl(user.profilePicture);
    //setProfileUrl(url);
    setCurrentState(2);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => navigate("/login");

  const handleChangeFile = async (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async () => {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        if (res) {
          const tmpUser = {
            ...currentUser,
            profilePicture: res.metadata.fullPath,
          };
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
        }
      };
    }
  };

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  if (state === 0)
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading...
      </AuthProvider>
    );

  return (
    <>
      <div>
        <h2>Edit Profile Info</h2>
        <div className={style.profilePictureContainer}>
          <div>
            <img src={profileUrl} alt="" width={100}></img>
          </div>
          <div>
            <button className="btn" onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
          </div>
          <input
            className={style.fileInput}
            ref={fileRef}
            type="file"
            onChange={handleChangeFile}
          />
        </div>
      </div>
    </>
  );
}
