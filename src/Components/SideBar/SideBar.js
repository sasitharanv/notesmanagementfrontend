import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SideBar.css";
import SidebarLinks from "./SidebarLinks";

const SideBar = () => {
  useEffect(() => {
    const menu = document.querySelector(".hamburger");
    const menuList = document.querySelector(".side-bar");
    const handleMenuClick = () => {
      menuList.classList.toggle("active-sidebar");
    };

    const closeMenuOutsideClick = (event) => {
      if (!menuList.contains(event.target) && !menu.contains(event.target)) {
        menuList.classList.remove("active-sidebar");
      }
    };

    menu.addEventListener("click", handleMenuClick);
    document.addEventListener("click", closeMenuOutsideClick);

    return () => {
      menu.removeEventListener("click", handleMenuClick);
      document.removeEventListener("click", closeMenuOutsideClick);
    };
  }, []);

  const handleCategoryClick = (category) => {
    // Handle category click logic
    console.log(`Category clicked: ${category}`);
  };

  return (
    <>
      <div className="hamburger">
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
      <div className="side-bar">
        <Link to="/home" style={{ "width": "100%" }}>
          <button style={{ "width": "100%" }} className="button-sidebar">Home<i className="sidebar-icon fa-solid fa-home"></i></button>
        </Link>
        <Link to="/archived" style={{ "width": "100%" }}>
          <button style={{ "width": "100%" }} className="button-sidebar">Archived<i className="sidebar-icon fa-solid fa-box-archive"></i></button>
        </Link>
        <Link to="/add/note" style={{ "width": "100%" }}>
          <button style={{ "width": "100%" }} className="button-sidebar">Add Note <i className="sidebar-icon fa-solid fa-plus"></i></button>
        </Link>
        <SidebarLinks handleCategoryClick={handleCategoryClick} />
        <button className="logout-button-sidebar">Logout <i className="sidebar-icon fa-solid fa-power-off"></i></button>
      </div>
    </>
  );
}

export default SideBar;