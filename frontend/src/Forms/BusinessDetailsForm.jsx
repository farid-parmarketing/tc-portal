import React, { useContext, useEffect, useMemo, useState } from "react";
import { entity, position } from "../assets/data/basicformdetails";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import BusinessDetailsModal from "../Modals/BusinessDetailsModal";

const BusinessDetailsForm = () => {
  const { url, user, generateToken, setCount } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    mobile: "",
    businessName: "",
    website: "",
    entity: "",
    whatsapp: "",
    position: "",
    address: "",
    city: "",
    street: "",
    msmeRegistered: "",
    msmeNumber: "",
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
  useEffect(() => {
    if (user !== null) {
      setInputs({
        ...inputs,
        fullName: user.Full_Name,
        email: user.Email,
        mobile: user.Mobile,
        businessName: user.Company,
      });
    }
  }, [user]);
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  //
  const [showModal, setShowModal] = useState(false);
  const validateInputs = () => {
    console.log(inputs);
    let errors = {};
    const requiredFields = [
      "fullName",
      "email",
      "mobile",
      "businessName",
      "entity",
      "position",
      "address",
      "city",
      "street",
      "msmeRegistered",
    ];
    requiredFields.forEach((field) => {
      if (!inputs[field]) {
        errors[field] = `${field} is required`;
      }
    });
    if (inputs.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email)) {
      errors.email = "Invalid email format";
    }
    if (inputs.mobile && !/^\d{10,15}$/.test(inputs.mobile)) {
      errors.mobile = "Mobile number should be 10-15 digits long";
    }
    if (inputs.whatsapp && !/^\d{10,15}$/.test(inputs.whatsapp)) {
      errors.whatsapp = "WhatsApp number should be 10-15 digits long";
    }
    if (inputs.msmeRegistered.toLowerCase() === "yes" && !inputs.msmeNumber) {
      errors.msmeNumber = "MSME Number is required";
    }
    setErrors(errors);
    //
    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    }
  };
  //
  const businessDetails = async (e) => {
    e.preventDefault();
    //
    try {
      const data = [
        {
          Lead_Name: inputs.fullName,
          Email: inputs.email,
          Mobile: inputs.mobile,
          Company: inputs.businessName,
          Website: inputs.website,
          Type_of_Entity: inputs.entity,
          WhatsApp_Number: inputs.whatsapp,
          Position_In_business: inputs.position,
          Flat_no_Building_name: inputs.address,
          City: inputs.city,
          Street: inputs.street,
          MSME_Number: inputs.msmeNumber,
          Step: "1",
        },
      ];
      const token = await generateToken();
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
          fullName: "",
          email: "",
          mobile: "",
          businessName: "",
          website: "",
          entity: "",
          whatsapp: "",
          position: "",
          address: "",
          city: "",
          street: "",
          msmeRegistered: "",
          msmeNumber: "",
        });
        setCount((prev) => {
          return prev + 1;
        });
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
            <small className="text-danger">{errors.fullName}</small>
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
            <small className="text-danger">{errors.email}</small>
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
            <small className="text-danger">{errors.mobile}</small>
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
            <small className="text-danger">{errors.businessName}</small>
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
            <small className="text-danger">{errors.entity}</small>
          </div>
          <div>
            <label>Whatsapp number</label>
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
            <small className="text-danger">{errors.position}</small>
          </div>
          <div>
            <label>
              Flat no/ building name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="address"
              value={inputs.address}
              onChange={handleInputs}
            />
            <small className="text-danger">{errors.address}</small>
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
            <small className="text-danger">{errors.city}</small>
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
            <small className="text-danger">{errors.street}</small>
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
            <small className="text-danger">{errors.msmeRegistered}</small>
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
              <small className="text-danger">{errors.msmeNumber}</small>
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
          <button className="button icon-button" onClick={validateInputs}>
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
