import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./linkContainer.module.css";

export default function LinkContainer({
  docId,
  title,
  url,
  onDelete,
  onUpdate,
}) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    titleRef.current && titleRef.current.focus();
  }, [editTitle]);

  useEffect(() => {
    urlRef.current && urlRef.current.focus();
  }, [editUrl]);

  const handleEditTitle = () => {
    setEditTitle(true);
  };

  const handleEditUrl = () => {
    setEditUrl(true);
  };

  const handleChangeTitle = (e) => {
    setCurrentTitle(e.target.value);
  };

  const handleChangeUrl = (e) => {
    setCurrentUrl(e.target.value);
  };

  const handleBlurTitle = (e) => {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleBlurUrl = (e) => {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleDeleteLink = (e) => {
    onDelete(docId);
  };

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <input
              ref={titleRef}
              value={currentTitle}
              onChange={handleChangeTitle}
              onBlur={handleBlurTitle}
            />
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditTitle}>
                <i className="material-icons">edit</i>
              </button>
              {currentTitle}
            </>
          )}
        </div>
        <div className={style.linkUrl}>
          {editUrl ? (
            <input
              ref={urlRef}
              value={currentUrl}
              onChange={handleChangeUrl}
              onBlur={handleBlurUrl}
            />
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditUrl}>
                <i className="material-icons">edit</i>
              </button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={handleDeleteLink}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}
