import axios from "axios";
import React, { useContext, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const ExistingDebtorModal = ({ debtorDetails, setDebtorDetails }) => {
  const { url, generateToken } = useContext(AppContext);
  const fetchNotes = async () => {
    try {
      const token = await generateToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtors_Details/${debtorDetails.id}/Notes`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (debtorDetails !== null) {
      fetchNotes();
    }
  }, [debtorDetails]);
  return (
    <>
      <div
        className="modal fade"
        id="existingDebtor"
        tabIndex="-1"
        aria-labelledby="existingDebtorLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-2">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2>Debtor's details</h2>
              <button
                className="button"
                data-bs-toggle="modal"
                data-bs-target="#existingDebtor"
                onClick={() => setDebtorDetails(null)}
              >
                <FaTimes />
              </button>
            </div>

            {debtorDetails !== null && (
              <>
                <div className="mb-3">
                  <p>Debtor company name</p>
                  <h2>{debtorDetails.Name}</h2>
                </div>
                <div className="mb-3">
                  <p>Debtor company name</p>
                  <h2>{debtorDetails.Debtor_Phone_Number}</h2>
                </div>
                <div className="mb-3">
                  <p>Debtor company name</p>
                  <h2>{debtorDetails.Debtor_Status}</h2>
                </div>
                <div className="mb-3">
                  <p>Debtor company name</p>
                  <h2>
                    {debtorDetails.Balance_O_D !== "-" && "Rs"}{" "}
                    {debtorDetails.Balance_O_D}
                  </h2>
                </div>
                <div>
                  <p>Debtor company name</p>
                  <h2>
                    {debtorDetails.Payment_Received !== "-" && "Rs"}{" "}
                    {debtorDetails.Payment_Received}
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExistingDebtorModal;
