import React from "react";
import { Link, useParams } from "react-router-dom";
import style from "./dashboardWrapper.module.css";

export default function Navbar() {
  return (
    <div>
      <nav className={style.nav}>
        <div className={style.logo}>
          linkTreeClone<span className="material-icons green">park</span>
        </div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/signout">Signout</Link>
      </nav>
    </div>
  );
}
