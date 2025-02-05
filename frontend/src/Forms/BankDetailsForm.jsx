import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import BankDetailsModal from "../Modals/BankDetailsModal";
import Cookies from "js-cookie";

const BankDetailsForm = ({ user }) => {
  const { url, generateToken, getUser } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    customerID: "",
    bankName: "",
    accountNumber: "",
    accountType: "",
    IFSC: "",
    branch: "",
    nameOnBankAccount: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  //
  useEffect(() => {
    if (user !== null) {
      setInputs({
        ...inputs,
        customerID: user.id,
      });
    }
  }, [user]);
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  //
  const [showModal, setShowModal] = useState(false);
  const validate = (e) => {
    e.preventDefault();
    const {
      bankName,
      accountNumber,
      accountType,
      IFSC,
      branch,
      nameOnBankAccount,
    } = inputs;
    if (!bankName) {
      setIsError(true);
      setMessage("Enter your bank name");
    } else if (!accountNumber) {
      setIsError(true);
      setMessage("Enter you whatsaccount number");
    } else if (!accountType) {
      setIsError(true);
      setMessage("select your account type");
    } else if (!IFSC) {
      setIsError(true);
      setMessage("Enter you IFSC code");
    } else if (!branch) {
      setIsError(true);
      setMessage("Enter yor bank branch name");
    } else if (!nameOnBankAccount) {
      setIsError(true);
      setMessage("Enter you street name on bank account");
    } else {
      setIsError(false);
      setMessage("");
      setShowModal(true);
    }
  };
  //
  const bankDetails = async (e) => {
    e.preventDefault();
    const {
      customerID,
      bankName,
      accountNumber,
      accountType,
      IFSC,
      branch,
      nameOnBankAccount,
    } = inputs;
    try {
      const token = Cookies.get("tcm_client_token");
      const res = await axios.post(`${url}/bankdetails`, {
        customerID,
        bankName,
        accountNumber,
        accountType,
        IFSC,
        branch,
        nameOnBankAccount,
        token,
      });
      //
      if (res.data.success === true) {
        setInputs({
          customerID: "",
          bankName: "",
          accountNumber: "",
          accountType: "",
          IFSC: "",
          branch: "",
          nameOnBankAccount: "",
        });
        setIsError(false);
        setMessage(res.data.message);
        getUser();
      } else if (res.data.success === false) {
        if (res.data.code === 400) {
          setIsError(true);
          setMessage(
            "Token expired. Limit reached. Please retry after some time."
          );
        } else if (res.data.code === 401) {
          setIsError(true);
          setMessage("Token expired. Please try again.");
          generateToken();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <>
      <form>
        <div className="details-form">
          <div>
            <label>
              Bank name <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              className="input"
              name="bankName"
              value={inputs.bankName}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Account number <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              className="input"
              name="accountNumber"
              value={inputs.accountNumber}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Type of bank account <span className="text-danger">*</span>{" "}
            </label>
            <select
              className="input"
              name="accountType"
              value={inputs.accountType}
              onChange={handleInputs}
            >
              <option>Please select</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
          <div>
            <label>
              IFSC code <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              className="input"
              name="IFSC"
              value={inputs.IFSC}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Branch name <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              className="input"
              name="branch"
              value={inputs.branch}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Name on bank account <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              className="input"
              name="nameOnBankAccount"
              value={inputs.nameOnBankAccount}
              onChange={handleInputs}
            />
          </div>
        </div>
        <p
          className={`text-end mt-4 ${
            isError ? "text-danger" : "text-success"
          }`}
        >
          {message}
        </p>
        <div className="d-flex align-items-center justify-content-end">
          <button className="button icon-button" onClick={validate}>
            Next
            <FaChevronRight />
          </button>
        </div>
      </form>

      {/*  */}
      <BankDetailsModal
        inputs={inputs}
        bankDetails={bankDetails}
        isError={isError}
        message={message}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default BankDetailsForm;
