import React from "react";
import { Link } from "react-router-dom";
import "./navigationBar.css";

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <Link to={"/upload"} className="logo">
        deepcolor.ai
      </Link>
      <div className="links">#links</div>
    </div>
  );
}

export default NavigationBar;
