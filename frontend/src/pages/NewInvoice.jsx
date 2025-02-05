import React from "react";
import Header from "../components/Header";
import {
  FaHashtag,
  FaRupeeSign,
  FaCalendarAlt,
  FaQuestionCircle,
  FaPercentage,
  FaBuilding,
  FaFile,
  FaStopwatch,
} from "react-icons/fa";
import { SiStatuspage } from "react-icons/si";
import { MdFeedback, MdDisplaySettings } from "react-icons/md";
import { PiCoinVertical } from "react-icons/pi";
import { GoLaw } from "react-icons/go";

const NewInvoice = () => {
  return (
    <>
      <div className="container">
        <Header title="Add new invoice" />
        {/*  */}
        <form>
          <div className="new-debtor-grid">
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>Invoice number</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>Invoice Reference number</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>Invoice amount</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>Invoice date</label>
              </div>
              <input
                type="date"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>Invoice due date</label>
              </div>
              <input
                type="date"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>Terms of payment</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>services or goods supplied</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaFile />
                <label>upload invoice copy</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>Do you have delivery challan?</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>delhivery challan number</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>do you have purchase order (PO)?</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>purchase order number</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaFile />
                <label>upload purchase order</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>purchase order date</label>
              </div>
              <input
                type="date"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>days delayed</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaPercentage />
                <label>interest percentage</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>interest amount</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>outstanding amount</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>has the debtor disputed the invoice?</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>are you holding any cheques from the debtor?</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>has the debtor bounced any cheques?</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>
                  has there been any legal action taken against the Invoice?
                </label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>cheque bounce amount</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>amount recieved</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>amount recieved date</label>
              </div>
              <input
                type="date"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>visit date</label>
              </div>
              <input
                type="date"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>promise to pay</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>final pending amount</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>promise to pay amount</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <MdDisplaySettings />
                <label>disputed informed</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaStopwatch />
                <label>frequency</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaBuilding />
                <label>visited city</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <MdFeedback />
                <label>FOS feedback</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>Number of visits</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <PiCoinVertical />
                <label>action</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <PiCoinVertical />
                <label>for phase</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <GoLaw />
                <label>type of case</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <SiStatuspage />
                <label>complaint status</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <SiStatuspage />
                <label>notice status</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <SiStatuspage />
                <label>status</label>
              </div>
              <input
                type="text"
                className="input pseudo"
                name="clientBusinessName"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewInvoice;
