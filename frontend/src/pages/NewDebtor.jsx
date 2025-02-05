import React, { useContext, useMemo, useState } from "react";
import { position } from "../assets/data/basicformdetails";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { FaBriefcase } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import Cookies from "js-cookie";

const NewDebtor = () => {
  const { url, user, getUser } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    clientBusinessName: "",
    companyName: "",
    mobile: "",
    whatsapp: "",
    telephone: "",
    email: "",
    balanceOutstanding: "",
    position: "",
    city: "",
    trading: "",
    businessAddress: "",
    homeAddress: "",
    notes: "",
    tradeLisenceNumber: "",
    typeOfCompany: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const addNewDebtor = async (e) => {
    e.preventDefault();
    //
    if (user === null) {
      getUser();
    } else {
      const {
        clientBusinessName,
        companyName,
        mobile,
        email,
        whatsapp,
        telephone,
        position,
        city,
        stillTrading,
        balanceOutstanding,
        businessAddress,
        homeAddress,
        tradeLicenseNumber,
        typeOfCompany,
        notes,
      } = inputs;
      const customerID = user.id;
      const token = Cookies.get("tcm_client_token");
      //
      const res = await axios.post(`${url}/newdebtor`, {
        customerID,
        token,
        clientBusinessName,
        companyName,
        mobile,
        email,
        whatsapp,
        telephone,
        position,
        city,
        stillTrading,
        balanceOutstanding,
        businessAddress,
        homeAddress,
        tradeLicenseNumber,
        typeOfCompany,
        notes,
      });
      //
      if (res.data.success === true) {
        setIsError(false);
        setMessage("Record saved");
      } else if (res.data.success === false) {
        if (res.data.code === 400) {
          setIsError(true);
          setMessage("Token limit reached");
        } else if (res.data.code === 401) {
          setIsError(true);
          setMessage("Token expired. Please try again after some time.");
        }
      }
    }
  };
  //
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);
  return (
    <>
      <div className="container">
        <Header title="Add new debtor" />
        <form onSubmit={addNewDebtor}>
          <div className="new-debtor-grid">
            <div>
              <div className="name-icon-flex">
                <FaBriefcase />
                <label>Client Business Name</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
                value={inputs.clientBusinessName}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaIdCard />
                <label>Debtor's company Name</label>
              </div>
              <input
                type="text"
                className="input"
                name="companyName"
                value={inputs.companyName}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaMobileAlt />
                <label>Debtor's mobile number</label>
              </div>
              <input
                type="number"
                className="input"
                name="mobile"
                value={inputs.mobile}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaWhatsapp />
                <label>whatsapp number</label>
              </div>
              <input
                type="number"
                className="input"
                name="whatsapp"
                value={inputs.whatsapp}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaPhoneAlt />
                <label>telephone number</label>
              </div>
              <input
                type="number"
                className="input"
                name="telephone"
                value={inputs.telephone}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaEnvelope />
                <label>Email address</label>
              </div>
              <input
                type="email"
                className="input"
                name="email"
                value={inputs.email}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBalanceScaleLeft />
                <label>balance outstanding</label>
              </div>
              <input
                type="number"
                className="input"
                name="balanceOutstanding"
                value={inputs.balanceOutstanding}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUserTie />
                <label>position in business</label>
              </div>
              <select
                className="input"
                name="position"
                value={inputs.position}
                onChange={handleInputs}
              >
                <option value="">Please select</option>
                {position.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUserTie />
                <label>City</label>
              </div>
              <input
                type="text"
                className="input"
                name="city"
                value={inputs.city}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestion />
                <label>debtor's business still trading?</label>
              </div>
              <select
                className="input"
                name="trading"
                value={inputs.trading}
                onChange={handleInputs}
              >
                <option value="">Please select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <IoLocationSharp />
                <label>debtor's business address</label>
              </div>
              <textarea
                className="input"
                name="businessAddress"
                value={inputs.businessAddress}
                onChange={handleInputs}
              ></textarea>
            </div>
            <div>
              <div className="name-icon-flex">
                <IoLocationSharp />
                <label>debtor's home address</label>
              </div>
              <textarea
                className="input"
                name="homeAddress"
                value={inputs.homeAddress}
                onChange={handleInputs}
              ></textarea>
            </div>
            <div>
              <div className="name-icon-flex">
                <IoNewspaperOutline />
                <label>notes</label>
              </div>
              <textarea
                className="input"
                name="notes"
                value={inputs.notes}
                onChange={handleInputs}
              ></textarea>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>debtor's Trade License Number</label>
              </div>
              <input
                type="text"
                className="input"
                name="tradeLisenceNumber"
                value={inputs.tradeLisenceNumber}
                onChange={handleInputs}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBuilding />
                <label>debtor's type of company</label>
              </div>
              <input
                type="text"
                className="input"
                name="typeOfCompany"
                value={inputs.typeOfCompany}
                onChange={handleInputs}
              />
            </div>
          </div>
          <div className="text-end">
            <p className={isError ? "text-danger" : "text-success"}>
              {message}
            </p>
            <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
              <button className="secondary-button">cancel</button>
              <button className="button">Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDebtor;
