import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UploadInvoiceModal from "../Modals/UploadInvoiceModal";
//
import { FaBriefcase } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { MdCreditCardOff } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { RiCalendarCloseLine } from "react-icons/ri";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GiPublicSpeaker } from "react-icons/gi";
import { FaLocationArrow } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { lengths, user } = useContext(AppContext);
  //
  return (
    <>
      <div className="container">
        <>
          {user !== null && (
            <div className="home-grid">
              <Link to="/basicdetails" className="box">
                <div className="title">
                  <p>Business details</p>
                  <FaBriefcase />
                </div>
                <div className="description">
                  <p>{user.Company}</p>
                </div>
              </Link>

              <div
                className="box upload-box"
                data-bs-toggle="modal"
                data-bs-target="#uploadInvoice"
              >
                <p>Upload Invoice</p>
                <MdCloudUpload />
              </div>

              <Link to="/existingdebtor" className="box">
                <div className="title">
                  <p>No of debtors</p>
                  <MdCreditCardOff />
                </div>
                <div className="description">
                  {/* <p>{lengths.noOfDebtors}</p> */}0
                </div>
              </Link>

              <Link to="/invoicelist" className="box">
                <div className="title">
                  <p>No of invoices</p>
                  <FaFileInvoice />
                </div>
                <div className="description">
                  {/* <p>{lengths.noOfInvoices}</p> */}0
                </div>
              </Link>

              <Link to="/cashcollected" className="box">
                <div className="title">
                  <p>Cash collected</p>
                  <FaMoneyBillAlt />
                </div>
                <div className="description">
                  {/* <p>{lengths.cashCollected}</p> */}0
                </div>
              </Link>

              <Link to="/promisetopay" className="box">
                <div className="title">
                  <p>Promise to pay</p>
                  <FaMoneyBill />
                </div>
                <div className="description">
                  {/* <p>{lengths.promiseTopay}</p> */}0
                </div>
              </Link>

              <Link to="/meritsofcases" className="box">
                <div className="title">
                  <p>Merits of cases</p>
                  <FaSuitcase />
                </div>
                <div className="description">
                  {/* <p>{lengths.meritsOfCases}</p> */}0
                </div>
              </Link>

              <Link to="/legalactions" className="box">
                <div className="title">
                  <p>Legal actions</p>
                  <GoLaw />
                </div>
                <div className="description">
                  {/* <p>{lengths.legalActions}</p> */}0
                </div>
              </Link>

              <Link to="/abscondedcases" className="box">
                <div className="title">
                  <p>Absconded cases</p>
                  <RiCalendarCloseLine />
                </div>
                <div className="description">
                  {/* <p>{lengths.abscondedCases}</p> */}0
                </div>
              </Link>

              <Link to="/liveinvoices" className="box">
                <div className="title">
                  <p>Live invoices</p>
                  <FaFileInvoiceDollar />
                </div>
                <div className="description">
                  {/* <p>{lengths.liveInvoices}</p> */}0
                </div>
              </Link>

              <Link to="/disputedinvoices" className="box">
                <div className="title">
                  <p>Disputed invoices</p>
                  <GiPublicSpeaker />
                </div>
                <div className="description">
                  {/* <p>{lengths.disputedInvoices}</p> */}0
                </div>
              </Link>

              <Link to="/fieldvisits" className="box">
                <div className="title">
                  <p>Field visits</p>
                  <FaLocationArrow />
                </div>
                <div className="description">
                  {/* <p>{lengths.fieldVisits}</p> */}0
                </div>
              </Link>
            </div>
          )}
        </>
      </div>

      {/* upload invoice modal */}
      <UploadInvoiceModal />
    </>
  );
};

export default Home;
