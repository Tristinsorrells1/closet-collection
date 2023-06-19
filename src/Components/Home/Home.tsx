import "./Home.css";
import { Link } from "react-router-dom";
import React from "react";

interface MenuItem {
  text: string;
  path: string;
}

export const AppMenu: React.FC = () => {
  const menuItems: MenuItem[] = [
    { text: "Closet", path: "/myCloset" },
    { text: "Calendar", path: "/calendar" },
    { text: "Lists", path: "/lists" },
    { text: "Create New List", path: "/addList" },
    { text: "Add New Item", path: "/addItem" },
  ];
  return (
    <div className="home-container">
      {menuItems.map(({ text, path }, index) => (
        <Link className="menu-item" key={index} to={path}>
          <div className="menu-text">{text}</div>
        </Link>
      ))}
    </div>
  );
};
