import React from "react";
import { useNavigate } from "react-router-dom";

const UploadInvoiceModal = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="modal fade"
        id="uploadInvoice"
        tabIndex="-1"
        aria-labelledby="uploadInvoiceLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header p-2">
              <h2>Upload Invoice</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-2">
              <div className="upload-invoice-grid">
                <button
                  className="button"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadInvoice"
                  onClick={() => navigate("/existingdebtor")}
                >
                  Existing debtor
                </button>
                <button
                  className="button"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadInvoice"
                  onClick={() => navigate("/newdebtor")}
                >
                  New debtor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadInvoiceModal;
