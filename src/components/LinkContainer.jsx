import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div key={docId}>
      <div>
        {editTitle ? (
          <input
            ref={titleRef}
            value={currentTitle}
            onChange={handleChangeTitle}
            onBlur={handleBlurTitle}
          />
        ) : (
          <>
            <button onClick={handleEditTitle}>Edit title</button>
            {currentTitle}
          </>
        )}
        <div>
          {editUrl ? (
            <input
              ref={urlRef}
              value={currentUrl}
              onChange={handleChangeUrl}
              onBlur={handleBlurUrl}
            />
          ) : (
            <>
              <button onClick={handleEditUrl}>Edit URL</button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  );
}
