import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const Payment = () => {
  return (
    <>
      <form className="container">
        <div className="payment-grid">
          <div>
            <div className="mb-4">
              <h2 className="mb-2">Taurus Collection Pvt. Ltd</h2>
              <p>
                Taurus Collection offers a No Collection No Fee service Meaning
                we only take fee on what we collect on your behalf.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="mb-2">Venue</h2>
              <p>
                1, Shah Industrial estate Veera Desai Road, Ghanshyam Industries
                Near Supreme Chambers, Andheri West, Mumbai, Maharashtra 400053
              </p>
            </div>
            <div className="mb-4">
              <h2 className="mb-2">Timings</h2>
              <p>Monday - Saturday || 9AM - 7PM</p>
            </div>
            <div className="mb-4">
              <h2 className="mb-2">Contact Us</h2>
              <a
                href="info@tauruscollection.com"
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
            <div className="mb-4">
              <h2 className="mb-2">Terms & conditions</h2>
              <p>
                You Agree to share information entered on this page with Taurus
                Collection Pvt. Ltd. (Owner of this Page) and Razorpay, ahering
                to applicable Laws.
              </p>
            </div>
          </div>
          {/*  */}
          <div className="payment-card">
            <h2>Payment details</h2>
            <hr />
            <div className="mb-4">
              <label>Business name</label>
              <input type="text" className="input" />
            </div>
            <div className="mb-4">
              <label>Mobile number</label>
              <input type="text" className="input" />
            </div>
            <div className="mb-4">
              <label>Email address</label>
              <input type="text" className="input" />
            </div>
            <div className="mb-4">
              <label>Company name</label>
              <input type="text" className="input" />
            </div>
            <button className="button w-100">Pay Rs.1000</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Payment;
