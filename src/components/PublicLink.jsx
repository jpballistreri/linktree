import React from "react";
import { Link } from "react-router-dom";
import style from "./publicLink.module.css";

export default function PublicLink({ url, title }) {
  return (
    <div>
      <a href={url} className={style.publicLinkContainer} target="_blank">
        <div>{title}</div>
      </a>
    </div>
  );
}
