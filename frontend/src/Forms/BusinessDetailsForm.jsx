import React, { useContext, useEffect, useMemo, useState } from "react";
import { entity, position } from "../assets/data/basicformdetails";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import BusinessDetailsModal from "../Modals/BusinessDetailsModal";
import Cookies from "js-cookie";

const BusinessDetailsForm = ({ user }) => {
  const { url, generateToken, getUser } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    customerID: "",
    fullName: "",
    email: "",
    mobile: "",
    businessName: "",
    website: "",
    entity: "",
    whatsapp: "",
    position: "",
    building: "",
    city: "",
    street: "",
    tradeLicenseNumber: "",
    msmeRegistered: "",
    msmeNumber: "",
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
        fullName: user.Full_Name,
        email: user.Email,
        mobile: user.Mobile,
        businessName: user.Company,
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
      entity,
      whatsapp,
      position,
      building,
      city,
      street,
      msmeRegistered,
    } = inputs;
    if (!entity) {
      setIsError(true);
      setMessage("Select type of entity");
    } else if (!whatsapp) {
      setIsError(true);
      setMessage("Enter you whatsapp number");
    } else if (!position) {
      setIsError(true);
      setMessage("select your position");
    } else if (!building) {
      setIsError(true);
      setMessage("Enter you building name");
    } else if (!city) {
      setIsError(true);
      setMessage("Enter you city");
    } else if (!street) {
      setIsError(true);
      setMessage("Enter you street name");
    } else if (!msmeRegistered) {
      setIsError(true);
      setMessage("Select MSME registered status");
    } else {
      setIsError(false);
      setMessage("");
      setShowModal(true);
    }
  };
  //
  const businessDetails = async (e) => {
    e.preventDefault();
    const {
      customerID,
      fullName,
      email,
      mobile,
      businessName,
      website,
      entity,
      whatsapp,
      position,
      building,
      city,
      street,
      tradeLicenseNumber,
      msmeRegistered,
      msmeNumber,
    } = inputs;
    //
    setIsError(true);

    try {
      const token = Cookies.get("tcm_client_token");
      const res = await axios.post(`${url}/businessdetails`, {
        customerID,
        fullName,
        email,
        mobile,
        businessName,
        website,
        entity,
        whatsapp,
        position,
        building,
        city,
        street,
        tradeLicenseNumber,
        msmeRegistered,
        msmeNumber,
        token,
      });
      //
      if (res.data.success === true) {
        setInputs({
          customerID: "",
          fullName: "",
          email: "",
          mobile: "",
          businessName: "",
          website: "",
          entity: "",
          whatsapp: "",
          position: "",
          building: "",
          city: "",
          street: "",
          tradeLicenseNumber: "",
          msmeRegistered: "",
          msmeNumber: "",
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
  //
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <>
      <>
        <div className="details-form">
          <div>
            <label>
              full name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="fullName"
              value={inputs.fullName}
              onChange={handleInputs}
              disabled={true}
            />
          </div>
          <div>
            <label>
              email address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="email"
              value={inputs.email}
              onChange={handleInputs}
              disabled={true}
            />
          </div>
          <div>
            <label>
              mobile number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="mobile"
              value={inputs.mobile}
              onChange={handleInputs}
              disabled={true}
            />
          </div>
          <div>
            <label>
              Business name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="businessName"
              value={inputs.businessName}
              onChange={handleInputs}
              disabled={true}
            />
          </div>
          <div>
            <label>Website</label>
            <input
              type="text"
              className="input"
              name="website"
              value={inputs.website}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Type of entity <span className="text-danger">*</span>
            </label>
            <select
              className="input"
              name="entity"
              value={inputs.entity}
              onChange={handleInputs}
            >
              <option>Select Entity</option>
              {entity.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>
              Whatsapp number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="whatsapp"
              value={inputs.whatsapp}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Position <span className="text-danger">*</span>
            </label>
            <select
              className="input"
              name="position"
              value={inputs.position}
              onChange={handleInputs}
            >
              <option>Select position</option>
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
            <label>
              Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="building"
              value={inputs.building}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              City <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="city"
              value={inputs.city}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              Street <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="street"
              value={inputs.street}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>Trade License Number</label>
            <input
              type="text"
              className="input"
              name="tradeLicenseNumber"
              value={inputs.tradeLicenseNumber}
              onChange={handleInputs}
            />
          </div>
          <div>
            <label>
              MSME registered <span className="text-danger">*</span>
            </label>
            <select
              className="input"
              name="msmeRegistered"
              value={inputs.msmeRegistered}
              onChange={handleInputs}
            >
              <option>Please select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {inputs.msmeRegistered.toLowerCase() === "yes" ? (
            <div>
              <label>MSME number</label>
              <input
                type="text"
                className="input"
                name="msmeNumber"
                value={inputs.msmeNumber}
                onChange={handleInputs}
              />
            </div>
          ) : (
            ""
          )}
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
      </>

      {/*  */}
      <BusinessDetailsModal
        inputs={inputs}
        businessDetails={businessDetails}
        isError={isError}
        message={message}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default BusinessDetailsForm;
