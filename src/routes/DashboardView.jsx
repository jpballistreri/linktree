import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  deleteLink,
  getLinks,
  insertNewLink,
  updateLink,
} from "../firebase/firebase";
import LinkContainer from "../components/LinkContainer";

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
    //console.log(resLinks);
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

  const addLink = async () => {
    if (title !== "" && url !== "") {
      const newLink = {
        docId: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = await insertNewLink(newLink);
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

  const handleDeleteLink = async (docId) => {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
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
          <LinkContainer
            key={link.docId}
            docId={link.docId}
            url={link.url}
            title={link.title}
            onDelete={handleDeleteLink}
            onUpdate={handleUpdateLink}
          />
        ))}
      </div>
    </DashboardWrapper>
  );
}
