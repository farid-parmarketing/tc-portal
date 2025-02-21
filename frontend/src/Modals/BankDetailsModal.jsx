import React from "react";

const BankDetailsModal = ({
  inputs,
  bankDetails,
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
              Bank Name : <span className="fw-bold">{inputs.bankName}</span>
            </p>
            <p>
              Account Number :{" "}
              <span className="fw-bold">{inputs.accountNumber}</span>
            </p>
            <p>
              Type of bank Account :{" "}
              <span className="fw-bold">{inputs.accountType}</span>
            </p>
            <p>
              IFSC code : <span className="fw-bold">{inputs.IFSC}</span>
            </p>
            <p>
              Branch Name : <span className="fw-bold">{inputs.branch}</span>
            </p>
            <p>
              Name on Bank Account :{" "}
              <span className="fw-bold">{inputs.nameOnBankAccount}</span>
            </p>
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
            <button className="button" onClick={bankDetails}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetailsModal;
