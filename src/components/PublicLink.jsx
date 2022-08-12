import React from "react";
import { Link } from "react-router-dom";

export default function PublicLink({ url, title }) {
  return (
    <div>
      <a href={url} target="_blank">
        {title}
      </a>
    </div>
  );
}
