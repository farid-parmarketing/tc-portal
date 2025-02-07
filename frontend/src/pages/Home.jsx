import React, { useContext, useEffect } from "react";
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
import axios from "axios";

const Home = () => {
  const { length, setLength, user, generateToken, url } =
    useContext(AppContext);
  //
  const fetchLength = async () => {
    try {
      const token = await generateToken();
      //
      const urls = [
        `https://www.zohoapis.in/crm/v2/Leads/${user.id}/Debtors_Details?page=1`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id}))&page=1`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Partially. Paid,Paid))`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Promise To Pay))`,
        `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${user.id})and(Debtor_Status:equals:Merit of the case))`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Legal Case))`,
        `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${user.id})and(Debtor_Status:equals:Client Terminated,Company Closed,Refuse to Pay,TC Terminated))`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Live))`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Disputed))`,
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:FOS Visited))`,
      ];
      const headers = {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      };
      //
      const responses = await Promise.all(
        urls.map((item) => axios.get(`${url}/proxy?url=${item}`, headers))
      );
      const counts = responses.map((item) => item.data.info?.count ?? 0);
      setLength({
        noOfDebtors: counts[0],
        noOfInvoices: counts[1],
        cashCollected: counts[2],
        promiseTopay: counts[3],
        meritsOfCases: counts[4],
        legalActions: counts[5],
        abscondedCases: counts[6],
        liveInvoices: counts[7],
        disputedInvoices: counts[8],
        fieldVisits: counts[9],
      });
      //
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user !== null) {
      fetchLength();
    }
  }, [user]);
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
                  <p>{length.noOfDebtors}</p>
                </div>
              </Link>

              <Link to="/invoicelist" className="box">
                <div className="title">
                  <p>No of invoices</p>
                  <FaFileInvoice />
                </div>
                <div className="description">
                  <p>{length.noOfInvoices}</p>
                </div>
              </Link>

              <Link to="/cashcollected" className="box">
                <div className="title">
                  <p>Cash collected</p>
                  <FaMoneyBillAlt />
                </div>
                <div className="description">
                  <p>{length.cashCollected}</p>
                </div>
              </Link>

              <Link to="/promisetopay" className="box">
                <div className="title">
                  <p>Promise to pay</p>
                  <FaMoneyBill />
                </div>
                <div className="description">
                  <p>{length.promiseTopay}</p>
                </div>
              </Link>

              <Link to="/meritsofcases" className="box">
                <div className="title">
                  <p>Merits of cases</p>
                  <FaSuitcase />
                </div>
                <div className="description">
                  <p>{length.meritsOfCases}</p>
                </div>
              </Link>

              <Link to="/legalactions" className="box">
                <div className="title">
                  <p>Legal actions</p>
                  <GoLaw />
                </div>
                <div className="description">
                  <p>{length.legalActions}</p>
                </div>
              </Link>

              <Link to="/abscondedcases" className="box">
                <div className="title">
                  <p>Absconded cases</p>
                  <RiCalendarCloseLine />
                </div>
                <div className="description">
                  <p>{length.abscondedCases}</p>
                </div>
              </Link>

              <Link to="/liveinvoices" className="box">
                <div className="title">
                  <p>Live invoices</p>
                  <FaFileInvoiceDollar />
                </div>
                <div className="description">
                  <p>{length.liveInvoices}</p>
                </div>
              </Link>

              <Link to="/disputedinvoices" className="box">
                <div className="title">
                  <p>Disputed invoices</p>
                  <GiPublicSpeaker />
                </div>
                <div className="description">
                  <p>{length.disputedInvoices}</p>
                </div>
              </Link>

              <Link to="/fieldvisits" className="box">
                <div className="title">
                  <p>Field visits</p>
                  <FaLocationArrow />
                </div>
                <div className="description">
                  <p>{length.fieldVisits}</p>
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
