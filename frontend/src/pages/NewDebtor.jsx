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
import { useNavigate } from "react-router-dom";

const NewDebtor = ({ fetchLength }) => {
  const { url, user, generateToken, setLength, setnoOfDebtors } =
    useContext(AppContext);
  const navigate = useNavigate();
  //
  const [inputs, setInputs] = useState({
    clientBusinessName: user.Company,
    companyName: "",
    mobile: "",
    whatsapp: "",
    telephone: "",
    email: "",
    balanceOutstanding: "",
    position: "",
    state: "",
    city: "",
    trading: "",
    businessAddress: "",
    homeAddress: "",
    notes: "",
    tradeLisenceNumber: "",
    typeOfCompany: "",
    gst: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    //
    if (name === "mobile" && !/^\d*$/.test(value)) return;
    //
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const [errors, setErrors] = useState({});
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const addNewDebtor = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const requiredFields = [
      "companyName",
      "mobile",
      "balanceOutstanding",
      "position",
      "typeOfCompany",
      "state",
      "city",
      "gst",
    ];
    requiredFields.forEach((field) => {
      if (!inputs[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    if (inputs.mobile && !/^\d{10}$/.test(inputs.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits long";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const token = await generateToken();
        const data = [
          {
            Lead: user.id,
            Client_Company_Name: inputs.clientBusinessName,
            Name: inputs.companyName,
            Debtor_Phone_Number: inputs.mobile,
            Type_Of_Company: inputs.typeOfCompany,
            Recovery_Stages: "Stage 0 - Enrolled",
            Debtor_City: inputs.city,
            Debtor_State: inputs.state,
            GST_number_of_Debtors_business: inputs.gst,
            Nature_of_Goods_Service: "FRAMES AND MOUNTINGS FOR SPECTACLES",
            Balance_O_D: inputs.balanceOutstanding,
            //
            Email: inputs.email,
            WhatsApp_Number: inputs.whatsapp,
            Debtor_Land_Line: inputs.telephone,
            Position_In_business: inputs.position,
            Business_Still_trading: inputs.stillTrading,
            Address_Of_Business: inputs.businessAddress,
            Home_Address_Of_Debtor: inputs.homeAddress,
            Debtors_Notes: inputs.notes,
          },
        ];
        const res = await axios.post(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtors_Details`,
          data,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res.status === 201) {
          setMessage("Debtor added successfully");
          setIsError(false);
          setInputs({
            clientBusinessName: user.Company,
            companyName: "",
            mobile: "",
            whatsapp: "",
            telephone: "",
            email: "",
            balanceOutstanding: "",
            position: "",
            state: "",
            city: "",
            trading: "",
            businessAddress: "",
            homeAddress: "",
            notes: "",
            tradeLisenceNumber: "",
            typeOfCompany: "",
            gst: "",
          });
          setErrors({});
          fetchLength(
            `https://www.zohoapis.in/crm/v2/Leads/${user.id}/Debtors_Details`,
            "noOfDebtors"
          ).then((result) => {
            if (result) {
              setLength((prevData) => ({
                ...prevData,
                [result.title]: result.data.data.length,
              }));
              setnoOfDebtors(result.data.data);
            }
          });
          setTimeout(() => {
            navigate("/existingdebtor", { replace: true });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
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
                autoComplete="off"
                disabled
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaIdCard />
                <label>
                  Debtor's company Name <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="text"
                className="input"
                name="companyName"
                value={inputs.companyName}
                onChange={handleInputs}
                autoComplete="off"
              />
              <small className="text-danger">{errors.companyName}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaMobileAlt />
                <label>
                  Debtor's mobile number <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="number"
                className="input"
                name="mobile"
                value={inputs.mobile}
                onChange={handleInputs}
                autoComplete="off"
              />
              <small className="text-danger">{errors.mobile}</small>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBalanceScaleLeft />
                <label>
                  balance outstanding <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="number"
                className="input"
                name="balanceOutstanding"
                value={inputs.balanceOutstanding}
                onChange={handleInputs}
                autoComplete="off"
              />
              <small className="text-danger">{errors.balanceOutstanding}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUserTie />
                <label>
                  position in business <span className="text-danger">*</span>
                </label>
              </div>
              <select
                className="input"
                name="position"
                value={inputs.position}
                onChange={handleInputs}
                autoComplete="off"
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
              <small className="text-danger">{errors.position}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUserTie />
                <label>State</label>
              </div>
              <input
                type="text"
                className="input"
                name="state"
                value={inputs.state}
                onChange={handleInputs}
                autoComplete="off"
              />
              <small className="text-danger">{errors.state}</small>
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
                autoComplete="off"
              />
              <small className="text-danger">{errors.city}</small>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
              ></textarea>
            </div>
            <div>
              <div className="name-icon-flex">
                <IoNewspaperOutline />
                <label>GST number of debtors business</label>
              </div>
              <input
                type="text"
                className="input"
                name="gst"
                value={inputs.gst}
                onChange={handleInputs}
                autoComplete="off"
              />
              <small className="text-danger">{errors.gst}</small>
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
                autoComplete="off"
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
                autoComplete="off"
              />
              <small className="text-danger">{errors.typeOfCompany}</small>
            </div>
          </div>
          <div className="text-end mt-4">
            <p className={isError ? "text-danger" : "text-success"}>
              {message}
            </p>
            <div className="d-flex align-items-center justify-content-end gap-2 mt-2">
              <button className="secondary-button" onClick={() => navigate(-1)}>
                cancel
              </button>
              <button className="button">Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDebtor;
