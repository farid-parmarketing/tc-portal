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
            <p>
              Full Name : <span className="fw-bold">{inputs.fullName}</span>
            </p>
            <p>
              Email Address : <span className="fw-bold">{inputs.email}</span>
            </p>
            <p>
              Mobile Number : <span className="fw-bold">{inputs.mobile}</span>
            </p>
            <p>
              Business Name :{" "}
              <span className="fw-bold">{inputs.businessName}</span>
            </p>
            <p>
              Website :{" "}
              <span className="fw-bold">
                {inputs.website === "" ? "-" : inputs.website}
              </span>
            </p>
            <p>
              Type of Entity : <span className="fw-bold">{inputs.entity}</span>
            </p>
            <p>
              Whatsapp Number :{" "}
              <span className="fw-bold">
                {inputs.whatsapp === "" ? "-" : inputs.whatsapp}
              </span>
            </p>
            <p>
              Position : <span className="fw-bold">{inputs.position}</span>
            </p>
            <p>
              Building Name : <span className="fw-bold">{inputs.address}</span>
            </p>
            <p>
              City : <span className="fw-bold">{inputs.city}</span>
            </p>
            <p>
              Street : <span className="fw-bold">{inputs.street}</span>
            </p> 
            <p>
              MSME Registered :{" "}
              <span className="fw-bold">{inputs.msmeRegistered}</span>
            </p>
            {inputs.msmeNumber !== "" ? (
              <p>
                MSME Number :{" "}
                <span className="fw-bold">{inputs.msmeNumber}</span>
              </p>
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
