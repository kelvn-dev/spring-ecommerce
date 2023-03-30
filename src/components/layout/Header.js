import { setAuthToken } from "common/helper";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/supercars"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Super Cars
      </NavLink>
      <NavLink
        to="/auth"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
        onClick={() => {setAuthToken(null); localStorage.removeItem("token")}}
      >
        Logout
      </NavLink>
    </header>
  );
};

export default Header;
