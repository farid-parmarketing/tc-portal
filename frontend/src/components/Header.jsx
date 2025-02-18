import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-between mb-4 p-2 ">
      <h2>{title}</h2>
      <button onClick={() => navigate(-1)} className="button icon-button">
        <FaArrowAltCircleLeft />
        Back
      </button>
    </div>
  );
};

export default Header;
