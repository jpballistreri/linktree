import React from "react";
import { Link } from "react-router-dom";
export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav>
        <div>
          <div>Logotipo</div>
          <Link to="/dashboard">Links</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/signout">Signout</Link>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
