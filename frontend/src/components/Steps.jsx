import React, { useContext } from "react";
import { FaAddressCard } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Steps = () => {
  const { count } = useContext(AppContext);
  return (
    <>
      <div className="step-container my-5">
        <div className="step-grid">
          <div className={`box ${count === "" ? "active" : ""}`}>
            <FaAddressCard />
          </div>
          <div className="line"></div>
          <div className={`box ${count === "1" ? "active" : ""}`}>
            <BiSolidBank />
          </div>
          <div className="line"></div>
          <div className={`box ${count === "2" ? "active" : ""}`}>
            <FaBook />
          </div>
        </div>
        <div className="step-text">
          <p className="bold">Business Details</p>
          <p className="bold">Bank Details</p>
          <p className="bold">Upload Documents</p>
        </div>
      </div>
    </>
  );
};

export default Steps;
