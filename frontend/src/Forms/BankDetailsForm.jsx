import React, { useContext, useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import BankDetailsModal from "../Modals/BankDetailsModal";

const BankDetailsForm = () => {
  const { url, user, generateToken, setCount } = useContext(AppContext);
  const [inputs, setInputs] = useState({
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  //
  const [showModal, setShowModal] = useState(false);
  const validateInputs = (e) => {
    e.preventDefault();
    let errors = {};
    const requiredFields = [
      "bankName",
      "accountNumber",
      "accountType",
      "IFSC",
      "branch",
      "nameOnBankAccount",
    ];
    requiredFields.forEach((field) => {
      if (!inputs[field]) {
        errors[field] = `${field} is required`;
      }
    });
    setErrors(errors);
    //
    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    }
  };
  //
  const bankDetails = async (e) => {
    e.preventDefault();
    try {
      const token = await generateToken();
      const data = [
        {
          Bank_Name: inputs.bankName,
          Account_Number: inputs.accountNumber,
          Account_Type: inputs.accountType,
          IFSC: inputs.IFSC,
          Branch_Name: inputs.branch,
          Name_on_Account: inputs.nameOnBankAccount,
          Step: "2",
        },
      ];
      const res = await axios.put(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${user.id}`,
        data,
        {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
        }
      );
      if (res.status === 200) {
        setIsError(false);
        setMessage("Data saved");
        setInputs({
          bankName: "",
          accountNumber: "",
          accountType: "",
          IFSC: "",
          branch: "",
          nameOnBankAccount: "",
        });
        setCount((prev) => {
          return prev + 1;
        });
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
            <small className="text-danger">{errors.bankName}</small>
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
            <small className="text-danger">{errors.accountNumber}</small>
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
            <small className="text-danger">{errors.accountType}</small>
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
            <small className="text-danger">{errors.IFSC}</small>
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
            <small className="text-danger">{errors.branch}</small>
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
            <small className="text-danger">{errors.nameOnBankAccount}</small>
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
          <button className="button icon-button" onClick={validateInputs}>
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
