import React from "react";

import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="container-fluid p-0">
        <div className="container text-center">
          <p className="text-capitalize">
            Copyright <FaCopyright />
            All Rights Reserved | Taurus Collection Pvt Ltd.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
