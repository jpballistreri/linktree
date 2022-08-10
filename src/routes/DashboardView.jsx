import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { getLinks, insertNewLink } from "../firebase/firebase";

export default function DashboardView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setCurrentState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setCurrentState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => navigate("/login");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
  };

  const addLink = () => {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }
    if (e.target.name === "url") {
      setUrl(value);
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
    <DashboardWrapper>
      <div>
        <h1>DASHBOARD</h1>
        <form action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleOnChange} />

          <label htmlFor="url">Title</label>
          <input type="text" name="url" onChange={handleOnChange} />

          <input type="submit" value="Create new link" />
        </form>
      </div>

      <div>
        {links.map((link) => (
          <div link={link.id}>
            <Link to={link.url}>{link.title}</Link>
          </div>
        ))}
      </div>
    </DashboardWrapper>
  );
}
