import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PublicLink from "../components/PublicLink";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";

export default function PublicProfileView() {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [pictureUrl, setPictureUrl] = useState("");
  const [state, setState] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProfile = async () => {
      const username = params.username;

      try {
        const userUid = await existsUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setPictureUrl(url);
          setLoading(false);
        } else setState(7);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [params]);

  if (state === 7) {
    return (
      <div>
        <h1>Username doesn't exist</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        {loading ? "Loading..." : <img src={pictureUrl} alt="public" />}
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.docId} url={link.url} title={link.title} />
        ))}
      </div>
    </div>
  );
}
