import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import {
  FaHashtag,
  FaRupeeSign,
  FaCalendarAlt,
  FaQuestionCircle,
  FaPercentage,
  FaFile,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const NewInvoice = () => {
  const { url, user, generateToken } = useContext(AppContext);
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    invoiceNumber: "",
    invoiceAmount: "",
    invoiceDate: "",
    invoiceDueDate: "",
    interestPercentage: "",
    daysDelayed: "",
    today: "",
    interestAmount: "",
    interestRate: "",
    outstandingAmount: "",
    paymentTerms: "",
    serviceOrGoodsSupplied: "",
    uploadInvoiceCopy: null,
    deliveryChalan: "",
    deliveryChalanNumber: "",
    uploadDeliveryChalan: null,
    deliveryDate: "",
    purchaseOrder: "",
    purchaseOrderNumber: "",
    uploadPurchaseOrder: null,
    purchaseOrderDate: "",
    disputedInvoice: "",
    holdingCheques: "",
    bouncedCheques: "",
    legalAction: "",
    chequeBounceAmount: "",
  });
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    let newErrors = {};
    const requiredFields = [
      "invoiceNumber",
      "invoiceAmount",
      "invoiceDate",
      "invoiceDueDate",
      "interestPercentage",
    ];
    requiredFields.forEach((field) => {
      if (!inputs[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    setErrors(newErrors);
    //
    if (Object.keys(newErrors).length === 0) {
      try {
        const token = await generateToken();
        const data = [
          {
            Name: inputs.invoiceNumber,
            Lead_Name: user.id,
            Debtor_Name1: id,
            Invoice_Amount: inputs.invoiceAmount,
            Invoice_Date: inputs.invoiceDate,
            Due_Date: inputs.invoiceDueDate,
            Pending_Invoice_Amount: inputs.invoiceAmount,
            Fixed_Interest_Percentage: inputs.interestPercentage,
            Calculation_Date: inputs.today.split("/").reverse().join("-"),
            //
            Payment_Terms: inputs.paymentTerms,
            Services_or_Goods_Supplied: inputs.serviceOrGoodsSupplied,
            Do_you_have_a_Delivery_Challan: inputs.deliveryChalan,
            Delivery_Challan_No: inputs.deliveryChalanNumber,
            Delivery_Date: inputs.deliveryDate,
            Do_you_have_a_Purchase_Order_PO: inputs.purchaseOrder,
            Purchase_Order_No: inputs.purchaseOrderNumber,
            Purchase_Order_Date: inputs.purchaseOrderDate,
            Are_you_holding_any_cheque_from_debtor: inputs.holdingCheques,
            Has_the_debtor_bounced_any_cheque: inputs.bouncedCheques,
            legal_action_taken: inputs.legalAction,
            Cheque_Bounce_Amount: inputs.chequeBounceAmount,
            Invoice_Disputed: inputs.disputedInvoice,
          },
        ];
        const res = await axios.post(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtor_Invoices`,
          data,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res.status === 201) {
          setIsError(false);
          setMessage("Invoice added successfullt");
          setInputs({
            invoiceNumber: "",
            invoiceAmount: "",
            invoiceDate: "",
            invoiceDueDate: "",
            interestPercentage: "",
            daysDelayed: "",
            today: "",
            interestAmount: "",
            interestRate: "",
            outstandingAmount: "",
            paymentTerms: "",
            serviceOrGoodsSupplied: "",
            uploadInvoiceCopy: null,
            deliveryChalan: "",
            deliveryChalanNumber: "",
            uploadDeliveryChalan: null,
            deliveryDate: "",
            purchaseOrder: "",
            purchaseOrderNumber: "",
            uploadPurchaseOrder: null,
            purchaseOrderDate: "",
            disputedInvoice: "",
            holdingCheques: "",
            bouncedCheques: "",
            legalAction: "",
            chequeBounceAmount: "",
          });
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  useEffect(() => {
    const dueDate = new Date(inputs.invoiceDueDate);
    const today = new Date();
    const diffInTime = dueDate.getTime() - today.getTime();
    const diffInDays = Math.abs(Math.ceil(diffInTime / (1000 * 3600 * 24)));
    //
    const interestRate = Math.round(
      (diffInDays * inputs.interestPercentage) / 365
    );
    const interestAmount = (inputs.invoiceAmount * interestRate) / 100;
    const outstanding =
      parseFloat(interestAmount) + parseFloat(inputs.invoiceAmount);

    if (
      inputs.invoiceAmount === "" ||
      inputs.invoiceDueDate === "" ||
      inputs.interestPercentage === ""
    ) {
      setInputs({
        ...inputs,
        daysDelayed: "",
        interestAmount: "",
        outstandingAmount: "",
        interestRate: "",
        today: "",
      });
    } else {
      setInputs({
        ...inputs,
        daysDelayed: diffInDays,
        interestAmount,
        outstandingAmount: outstanding,
        interestRate,
        today: today.toLocaleDateString(),
      });
    }
  }, [inputs.interestPercentage, inputs.invoiceDueDate, inputs.invoiceAmount]);
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
                <label>
                  Invoice number <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="text"
                className="input"
                name="invoiceNumber"
                value={inputs.invoiceNumber}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.invoiceNumber}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>
                  Invoice amount <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="number"
                className="input"
                name="invoiceAmount"
                value={inputs.invoiceAmount}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.invoiceAmount}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>
                  Invoice date <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="date"
                className="input"
                name="invoiceDate"
                value={inputs.invoiceDate}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.invoiceDate}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>
                  Invoice due date <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="date"
                className="input"
                name="invoiceDueDate"
                value={inputs.invoiceDueDate}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.invoiceDueDate}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaPercentage />
                <label>
                  interest percentage <span className="text-danger">*</span>
                </label>
              </div>
              <input
                type="text"
                className="input"
                name="interestPercentage"
                value={inputs.interestPercentage}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.interestPercentage}</small>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>days delayed</label>
              </div>
              <input
                type="text"
                className="input"
                name="daysDelayed"
                value={inputs.daysDelayed}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>interest amount</label>
              </div>
              <input
                type="text"
                className="input"
                name="interestAmount"
                value={inputs.interestAmount}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaPercentage />
                <label>interest rate</label>
              </div>
              <input
                type="text"
                className="input"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>Outstanding amount</label>
              </div>
              <input
                type="text"
                className="input"
                name="outstandingAmount"
                value={inputs.outstandingAmount}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>Terms of payment</label>
              </div>
              <input
                type="text"
                className="input"
                name="paymentTerms"
                value={inputs.paymentTerms}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>services or goods supplied</label>
              </div>
              <select
                className="input"
                name="serviceOrGoodsSupplied"
                value={inputs.serviceOrGoodsSupplied}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaFile />
                <label>upload invoice copy</label>
              </div>
              <input
                type="file"
                className="input"
                name="uploadInvoiceCopy"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>Do you have delivery challan?</label>
              </div>
              <select
                className="input"
                name="deliveryChalan"
                value={inputs.deliveryChalan}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>If Yes, delivery challan number</label>
              </div>
              <input
                type="text"
                className="input"
                name="deliveryChalanNumber"
                value={inputs.deliveryChalanNumber}
                onChange={handleChange}
                disabled={inputs.deliveryChalan === "yes" ? false : true}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaFile />
                <label>Upload Delivery Challan</label>
              </div>
              <input
                type="file"
                className="input"
                name="uploadDeliveryChalan"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>Date of delivery</label>
              </div>
              <input
                type="date"
                className="input"
                name="deliveryDate"
                value={inputs.deliveryDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>do you have purchase order (PO)?</label>
              </div>
              <select
                className="input"
                name="purchaseOrder"
                value={inputs.purchaseOrder}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaHashtag />
                <label>If Yes, purchase order number</label>
              </div>
              <input
                type="text"
                className="input"
                name="purchaseOrderNumber"
                value={inputs.purchaseOrderNumber}
                onChange={handleChange}
                disabled={inputs.purchaseOrder === "yes" ? false : true}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaFile />
                <label>upload purchase order</label>
              </div>
              <input
                type="file"
                className="input"
                name="uploadPurchaseOrder"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaCalendarAlt />
                <label>purchase order date</label>
              </div>
              <input
                type="date"
                className="input"
                name="purchaseOrderDate"
                value={inputs.purchaseOrderDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>has the debtor disputed the invoice?</label>
              </div>
              <select
                className="input"
                name="disputedInvoice"
                value={inputs.disputedInvoice}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>are you holding any cheques from the debtor?</label>
              </div>
              <select
                className="input"
                name="holdingCheques"
                value={inputs.holdingCheques}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>has the debtor bounced any cheques?</label>
              </div>
              <select
                className="input"
                name="bouncedCheques"
                value={inputs.bouncedCheques}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaQuestionCircle />
                <label>
                  has there been any legal action taken against the Invoice?
                </label>
              </div>
              <select
                className="input"
                name="legalAction"
                value={inputs.legalAction}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">no</option>
              </select>
            </div>
            <div>
              <div className="name-icon-flex">
                <FaRupeeSign />
                <label>cheque bounce amount</label>
              </div>
              <input
                type="number"
                className="input"
                name="chequeBounceAmount"
                value={inputs.chequeBounceAmount}
                onChange={handleChange}
              />
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
              <button className="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewInvoice;
