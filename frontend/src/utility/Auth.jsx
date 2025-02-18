import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Auth = ({ Component }) => {
  const {
    url,
    generateToken,
    user,
    setUser,
    setLength,
    setnoOfDebtors,
    setnoOfInvoices,
    setcashCollected,
    setpromiseTopay,
    setmeritsOfCases,
    setlegalActions,
    setabscondedCases,
    setliveInvoices,
    setdisputedInvoices,
    setfieldVisits,
  } = useContext(AppContext);
  const navigate = useNavigate();
  //
  const [loading, setLoading] = useState(true);
  //
  const getUser = async () => {
    try {
      const id = localStorage.getItem("tc-portal-id");
      if (!id) {
        navigate("/login", { replace: true });
      } else {
        const token = await generateToken();
        const res = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${JSON.parse(
            id
          )}`,
          {
            headers: { Authorization: `Zoho-oauthtoken ${token}` },
          }
        );
        let userData = res.data.data[0];
        for (let item in userData) {
          if (userData[item] === null) {
            userData[item] = "";
          }
        }
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  //
  const fetchLength = async (zohoURL, title) => {
    try {
      const token = await generateToken();
      const res = await axios.get(`${url}/data-proxy?zohoURL=${zohoURL}`, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      });
      return {
        data: res.data,
        title,
      };
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user !== null) {
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
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id}))`,
        "noOfInvoices"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setnoOfInvoices(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Partially. Paid,Paid))`,
        "cashCollected"
      ).then((result) => {
        if (result) {
          let temp = 0;
          result.data.data.forEach((item) => {
            temp += parseFloat(item.Amount_Paid);
          });
          setLength((prevData) => ({
            ...prevData,
            [result.title]: temp,
          }));
          setcashCollected(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Promise To Pay))`,
        "promiseTopay"
      ).then((result) => {
        if (result) {
          let temp = 0;
          result.data.data.forEach((item) => {
            temp += parseFloat(item.Promise_to_Pay_Amount);
          });
          setLength((prevData) => ({
            ...prevData,
            [result.title]: temp,
          }));
          setpromiseTopay(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${user.id})and(Debtor_Status:equals:Merit of the case))`,
        "meritsOfCases"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setmeritsOfCases(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Legal Case))`,
        "legalActions"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setlegalActions(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtors_Details/search?criteria=((Lead:equals:${user.id})and(Debtor_Status:equals:Client Terminated,Company Closed,Refuse to Pay,TC Terminated))`,
        "abscondedCases"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setabscondedCases(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Live))`,
        "liveInvoices"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setliveInvoices(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Disputed))`,
        "disputedInvoices"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setdisputedInvoices(result.data.data);
        }
      });
      //
      fetchLength(
        `https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:FOS Visited))`,
        "fieldVisits"
      ).then((result) => {
        if (result) {
          setLength((prevData) => ({
            ...prevData,
            [result.title]: result.data.data.length,
          }));
          setfieldVisits(result.data.data);
        }
      });
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Component />
        </>
      )}
    </>
  );
};

export default Auth;
