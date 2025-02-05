import React, { useContext, useMemo, useRef, useState } from "react";
import bigLogo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = () => {
  const { url, generateToken } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    companyName: "",
    agreement: false,
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  //
  const checboxRef = useRef(null);
  const handleAgreement = (e) => {
    if (e.target.checked === true) {
      setInputs({
        ...inputs,
        agreement: true,
      });
    } else if (e.target.checked === false) {
      setInputs({
        ...inputs,
        agreement: false,
      });
    }
  };
  //
  const [message, setMessage] = useState("");
  const [isError, setisError] = useState(true);
  const signup = async (e) => {
    e.preventDefault();
    //
    if (!inputs.firstName) {
      setMessage("Enter you name");
    } else if (!inputs.lastName) {
      setMessage("Enter you name");
    } else if (!inputs.email) {
      setMessage("Enter you email address");
    } else if (!inputs.mobile) {
      setMessage("Enter you mobile number");
    } else if (!inputs.password) {
      setMessage("Enter you password");
    } else if (!inputs.companyName) {
      setMessage("Enter you company name");
    } else if (inputs.agreement !== true) {
      setMessage("Please agree on our terms & conditions");
    } else {
      const token = await generateToken();
      const data = {
        First_Name: inputs.firstName,
        Last_Name: inputs.lastName,
        Full_Name: `${inputs.firstName} ${inputs.lastName}`,
        Email: inputs.email,
        Password: inputs.password,
        Mobile: inputs.mobile,
        Company: inputs.companyName,
        Created_Time: Date.now(),
      };

      const res = await axios.post(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads`,
        [data],
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.data.data[0].code === "SUCCESS") {
        setisError(false);
        setMessage("Account created");
        setInputs({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
          companyName: "",
          agreement: false,
        });
        checboxRef.current.checked = false;
      }
    }
  };
  //
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
        setisError(true);
      }, 3000);
    }
  }, [message]);
  //
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (e) => {
    if (e.target.checked === true) {
      setShowPassword(true);
    } else if (e.target.checked === false) {
      setShowPassword(false);
    }
  };
  return (
    <>
      <div className="signup-container">
        <div className="signup-left">
          <div className="w-100">
            <img src={bigLogo} alt="bigLogo" />
          </div>

          <div className="text-center my-5">
            <p className="bold">New here?</p>
            <p>Sign up and upload your outstanding invoices</p>
          </div>

          <form className="mb-4" onSubmit={signup}>
            <div className="mb-4">
              <label>First name</label>
              <input
                type="text"
                className="input w-100"
                name="firstName"
                value={inputs.firstName}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-4">
              <label>last name</label>
              <input
                type="text"
                className="input w-100"
                name="lastName"
                value={inputs.lastName}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-4">
              <label>Email address</label>
              <input
                type="email"
                className="input w-100"
                name="email"
                value={inputs.email}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-4">
              <label>Mobile number</label>
              <input
                type="number"
                className="input w-100"
                name="mobile"
                value={inputs.mobile}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="input w-100"
                name="password"
                value={inputs.password}
                onChange={handleInputs}
              />
              <label className="d-flex align-items-center justify-content-start gap-1">
                <input type="checkbox" onClick={togglePassword} />
                Show password
              </label>
            </div>
            <div className="mb-4">
              <label>Company name</label>
              <input
                type="text"
                className="input w-100"
                name="companyName"
                value={inputs.companyName}
                onChange={handleInputs}
              />
            </div>

            <div className="d-flex align-items-center justify-content-start column-gap-2 flex-wrap mb-4">
              <p className="text-center">
                <input
                  type="checkbox"
                  className="me-2"
                  onClick={handleAgreement}
                  ref={checboxRef}
                />
                I agree to
              </p>
              <a
                href="https://tauruscollection.com/terms-conditions"
                className="primary-text text-capitalize"
                target="_blank"
              >
                privacy policy & terms
              </a>
            </div>
            <p className={`${isError ? "text-danger" : "text-success"} mb-2`}>
              {message}
            </p>
            <button className="button w-100">Sign up</button>
          </form>

          <div className="two-text-flex">
            <p className="text-center">Already an account?</p>
            <Link to="/login" className="primary-text text-capitalize">
              Login
            </Link>
          </div>
        </div>

        <div className="signup-right">
          <div>
            <h2 className="mb-2">
              You will need the following documents to be uploaded:
            </h2>
            <ul>
              <li>Trade License Number Certificate</li>
              <li>MSME Certificate</li>
              <li>Your Aadhar Card</li>
              <li>
                Your PAN Card & Company PAN Card if you are a Pvt. Ltd or LLP
                entity
              </li>
              <li>CIN Certificate for Pvt. Ltd or LLP entity</li>
              <li>
                A cancelled cheque (Bank account details where you need the
                outstanding invoice to be paid into)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
