import React from "react";
import logo from "../assets/images/logo.svg";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal";

const Navbar = () => {
  return (
    <>
      <nav className="container-fluid p-0">
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="loog" />
          </Link>

          <div className="nav-icons gap-sm-4 gap-2">
            <div
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
              className="pointer"
            >
              <IoMdLogOut />
            </div>
          </div>
        </div>
      </nav>
      <LogoutModal />
    </>
  );
};

export default Navbar;
