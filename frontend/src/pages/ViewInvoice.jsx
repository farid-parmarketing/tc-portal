import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { FaUser } from "react-icons/fa";

const ViewInvoice = () => {
  const { url, generateToken } = useContext(AppContext);
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const fetchInvoice = async () => {
    try {
      const token = await generateToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtor_Invoices/${id}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      const data = res.data.data[0];
      for (let item in data) {
        if (data[item] === null) {
          data[item] = "-";
        }
      }
      console.log(data);
      setInvoice(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);
  return (
    <>
      <div className="container">
        <Header title="Invoice details" />
        {invoice !== null ? (
          <div className="basic-details-grid">
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Invoive number</p>
              </div>
              <h2>{invoice.Name}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Invoice amount</p>
              </div>
              <h2>Rs {invoice.Invoice_Amount.toLocaleString("en-IN")}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Invoice Date</p>
              </div>
              <h2>{invoice.Invoice_Date.split("-").reverse().join("-")}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Invoice Due Date</p>
              </div>
              <h2>{invoice.Due_Date}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Terms Of Payment</p>
              </div>
              <h2>{invoice.Payment_Terms}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Services or Goods Supplied?</p>
              </div>
              <h2>{invoice.Services_or_Goods_Supplied}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Upload Invoice Copy</p>
              </div>
              <h2>upload</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Do you have a Delivery Challan ?</p>
              </div>
              <h2>{invoice.Do_you_have_a_Delivery_Challan}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>If Yes Delivery Challan Number</p>
              </div>
              <h2>{invoice.Delivery_Challan_No}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Upload Delivery Challan</p>
              </div>
              <h2>Upload</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Date of delivery</p>
              </div>
              <h2>{invoice.Delivery_Date}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Do you have a Purchase Order (PO) ?</p>
              </div>
              <h2>{invoice.Do_you_have_a_Purchase_Order_PO}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>If Yes Purchase Order Number</p>
              </div>
              <h2>{invoice.Purchase_Order_No}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Upload Purchase Order</p>
              </div>
              <h2>Upload</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Purchased order date</p>
              </div>
              <h2>{invoice.Purchase_Order_Date}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Days Delay</p>
              </div>
              <h2>{invoice.No_of_Days_Delayed}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Interest Percentage</p>
              </div>
              <h2>{invoice.Interest_Percentage}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Interest Amount</p>
              </div>
              <h2>{invoice.Interest_Amount_Payment}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Outstanding Amount</p>
              </div>
              <h2>
                Rs {invoice.Total_Outstanding_Amount.toLocaleString("en-IN")}
              </h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Has the debtor disputed the invoice ?</p>
              </div>
              <h2>{invoice.Invoice_Disputed}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Are you holding any cheques from the debtor ?</p>
              </div>
              <h2>{invoice.Are_you_holding_any_cheque_from_debtor}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Has the debtor bounced any cheques ?</p>
              </div>
              <h2>{invoice.Has_the_debtor_bounced_any_cheque}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>
                  Has there been any legal action taken against this Invoice ?
                </p>
              </div>
              <h2>{invoice.legal_action_taken}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Amount Received</p>
              </div>
              <h2>Rs {invoice.Amount_Paid.toLocaleString("en-IN")}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Amount Received Date</p>
              </div>
              <h2>{invoice.Amount_Paid_Date}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Visit Date</p>
              </div>
              <h2>{invoice.Visit_Date}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Promise To Pay</p>
              </div>
              <h2>{invoice.Promise_To_Pay}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Final Pending Amount</p>
              </div>
              <h2>{invoice.Pending_Invoice_Amount}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Promise To Pay Amount</p>
              </div>
              <h2>{invoice.Promise_to_Pay_Amount}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Dispute Informed</p>
              </div>
              <h2>{invoice.Dispute_Informed}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Frequency</p>
              </div>
              <h2>{invoice.Frequency}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Visited City</p>
              </div>
              <h2>{invoice.Visited_City}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>FOS Feedback</p>
              </div>
              <h2>{invoice.FOS_Feedback}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>No. of Visit</p>
              </div>
              <h2>{invoice.No_of_Visit}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Action</p>
              </div>
              <h2>{invoice.Action}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>For Phase</p>
              </div>
              <h2>{invoice.For_phase}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Type of Case</p>
              </div>
              <h2>Array</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Complaint Status</p>
              </div>
              <h2>{invoice.Complaint_Status}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Notice Status</p>
              </div>
              <h2>{invoice.Notice_Status}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Date of Legal Action</p>
              </div>
              <h2>{invoice.Date_of_Legal_Action}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Cheque Bounce Amount</p>
              </div>
              <h2>{invoice.Cheque_Bounce_Amount}</h2>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaUser />
                <p>Status</p>
              </div>
              <h2>{invoice.Invoice_Status}</h2>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ViewInvoice;
