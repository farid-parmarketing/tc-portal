import React, { useContext, useEffect, useState } from "react";
import paymentOptions from "../assets/images/payment_options.webp";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Cookies from "js-cookie";

const Payment = ({ user }) => {
  const { url } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
  });
  useEffect(() => {
    if (user !== null) {
      console.log(user);
      setInputs({
        name: user.Full_Name,
        mobile: user.Mobile,
        email: user.Email,
        company: user.Company,
      });
    }
  }, [user]);
  //
  const payment = async () => {
    const token = Cookies.get("tcm_client_token");
    try {
      const res = await axios.post(`${url}/payment`);
      //
      if (res.data.success === true) {
        window.open(
          res.data.result.redirect_url,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (res.data.success === false) {
        window.alert("Payment already done");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="payment-grid">
        <div>
          <div className="mb-4">
            <h2>Taurus Collection Pvt. Ltd</h2>
            <p>
              Taurus Collection offers a{" "}
              <span className="fw-bold">No Collection No Fee</span> service
              meaning we only take fee on what we collect on your behalf.
            </p>
          </div>
          <div className="mb-4">
            <h2>Venue</h2>
            <p>
              1, Shah Industrial estate Veera Desai Road, Ghanshyam Industries
              Near Supreme Chambers, Andheri West, Mumbai, Maharashtra 400053
            </p>
          </div>
          <div className="mb-4">
            <h2>Timings</h2>
            <p>Monday - Saturday - 9PM - 7PM</p>
          </div>
          <div>
            <h2>Contact Us</h2>
            <a
              href="mailto:info@tauruscollection.com"
              className="d-flex align-items-center justify-content-start gap-2"
            >
              <FaEnvelope />
              info@tauruscollection.com
            </a>
            <a
              href="tel:+919136956881"
              className="d-flex align-items-center justify-content-start gap-2"
            >
              <FaPhoneAlt />
              +91 9136956881
            </a>
          </div>
        </div>
        {/*  */}
        <div className="shadow rounded border p-2">
          <div className="mb-4">
            <label>Full name</label>
            <input
              type="text"
              className="input"
              value={inputs.name}
              onChange={() => console.log("Hello world")}
              disabled
            />
          </div>
          <div className="mb-4">
            <label>Mobile number</label>
            <input
              type="text"
              className="input"
              value={inputs.mobile}
              onChange={() => console.log("Hello world")}
              disabled
            />
          </div>
          <div className="mb-4">
            <label>Email address</label>
            <input
              type="text"
              className="input"
              value={inputs.email}
              onChange={() => console.log("Hello world")}
              disabled
            />
          </div>
          <div>
            <label>Company name</label>
            <input
              type="text"
              className="input"
              value={inputs.company}
              onChange={() => console.log("Hello world")}
              disabled
            />
          </div>
          <div className="w-100 my-4">
            <img src={paymentOptions} alt="" />
          </div>
          <button className="button w-100" onClick={payment}>
            Pay 50 AED
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
