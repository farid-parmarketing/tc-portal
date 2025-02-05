import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>{title}</h2>
        <Link to="/" className="button">
          <FaHome />
        </Link>
      </div>
    </>
  );
};

export default Header;
