import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/components/nav-bar.scss";
import { NAV_LINKS } from "../constants/nav-links";

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul>
        {NAV_LINKS.map((link) => {
          return (
            <li key={link.path}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
