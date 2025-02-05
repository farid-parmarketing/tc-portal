import React from "react";

const BusinessDetailsModal = ({
  inputs,
  businessDetails,
  isError,
  message,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <div
        className={`business-details-modal ${showModal ? "active" : ""}`}
        onClick={() => setShowModal(false)}
      >
        <div className="business-details-modal-body">
          <h2 className="mb-2">Business details</h2>
          <div>
            <p>Full Name : {inputs.fullName}</p>
            <p>Email Address : {inputs.email}</p>
            <p>Mobile Number : {inputs.mobile}</p>
            <p>Business Name : {inputs.businessName}</p>
            <p>Website : {inputs.website}</p>
            <p>Type of Entity : {inputs.entity}</p>
            <p>Whatsapp Number : {inputs.whatsapp}</p>
            <p>Position : {inputs.position}</p>
            <p>Building Name : {inputs.building}</p>
            <p>City : {inputs.city}</p>
            <p>Street : {inputs.street}</p>
            <p>Trade Lisence Number : {inputs.tradeLicenseNumber}</p>
            <p>MSME Registered : {inputs.msmeRegistered}</p>
            {inputs.msmeNumber !== "" ? (
              <p>MSME Number : {inputs.msmeNumber}</p>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          <p
            className={`text-end mt-4 ${
              isError ? "text-danger" : "text-success"
            }`}
          >
            {message}
          </p>
          <div className="d-flex align-items-center justify-content-end gap-2">
            <button
              className="secondary-button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="button" onClick={businessDetails}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDetailsModal;
