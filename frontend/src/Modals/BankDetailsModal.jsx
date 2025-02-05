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
            <p>Bank Name : {inputs.bankName}</p>
            <p>Account Number : {inputs.accountNumber}</p>
            <p>Type of bank Account : {inputs.accountType}</p>
            <p>IFSC code : {inputs.IFSC}</p>
            <p>Branch Name : {inputs.branch}</p>
            <p>Name on Bank Account : {inputs.nameOnBankAccount}</p>
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
