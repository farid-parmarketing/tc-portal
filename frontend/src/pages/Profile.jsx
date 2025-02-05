import React, { useContext } from "react";
import Header from "../components/Header";
import profilePic from "../assets/images/profile-pic.jfif";
import { FaPen } from "react-icons/fa";
import EditProfileModal from "../Modals/EditProfileModal";
//
import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className="container">
        <Header title="Profile" />
        {user !== null && (
          <>
            <div className="profile-grid">
              <div>
                <div className="mb-4">
                  <div className="name-icon-flex">
                    <FaUser />
                    <h2>Name</h2>
                  </div>
                  <h2 className="light-text">{user.Full_Name}</h2>
                </div>
                <div className="mb-4">
                  <div className="name-icon-flex">
                    <FaEnvelope />
                    <h2>Email address</h2>
                  </div>
                  <h2 className="light-text">{user.Email}</h2>
                </div>
                <div className="mb-4">
                  <div className="name-icon-flex">
                    <FaPhoneAlt />
                    <h2>Mobile number</h2>
                  </div>
                  <h2 className="light-text">{user.Mobile}</h2>
                </div>
              </div>
              <div className="profile-pic">
                <img src={profilePic} alt="profilePic" />
              </div>
            </div>
            <hr />
            <div>
              <button
                className="button icon-button ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#editProfile"
              >
                Edit profile <FaPen />
              </button>
            </div>
          </>
        )}
      </div>

      {/*  */}
      <EditProfileModal />
    </>
  );
};

export default Profile;
