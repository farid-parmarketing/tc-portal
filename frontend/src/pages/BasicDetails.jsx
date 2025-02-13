import React, { useContext } from "react";
import Header from "../components/Header";
import { FaBriefcase } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const BasicDetails = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  return (
    <>
      <div className="container">
        <Header title="Basic details" />
        {user !== null && (
          <div className="basic-details-grid">
            <div>
              <div className="name-icon-flex">
                <FaBriefcase />
                <p className="bold">Business name</p>
              </div>
              <p>{user.Company}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBriefcase />
                <p className="bold">User name</p>
              </div>
              <p>{user.Full_Name}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaGlobeAmericas />
                <p className="bold">Website</p>
              </div>
              <p>{user.Website}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaGlobeAmericas />
                <p className="bold">Email address</p>
              </div>
              <p>{user.Email}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaMobileAlt />
                <p className="bold">Mobile number</p>
              </div>
              <p>{user.Mobile}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaClipboardList />
                <p className="bold">Type of entity</p>
              </div>
              <p>{user.Type_of_Entity}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaWhatsapp />
                <p className="bold">Whatsapp number</p>
              </div>
              <p>{user.WhatsApp_Number}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUserTie />
                <p className="bold">Position</p>
              </div>
              <p>{user.Position}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBuilding />
                <p className="bold">Address</p>
              </div>
              <p>
                {user.Flat_no_Building_name},{user.Street},{user.City}
              </p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <p className="bold">Trade License Number</p>
              </div>
              <p>{user.CIN}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBook />
                <p className="bold">MSME registered</p>
              </div>
              <p>{user.MSME}</p>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <p className="bold">MSME number</p>
              </div>
              <p>{user.MSME_Number}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BasicDetails;
