import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const url = "http://localhost:8014";
  const [user, setUser] = useState(null);
  const [count, setCount] = useState("");
  //
  const generateToken = async () => {
    const res = await axios.get(`${url}/token`);
    return res.data.token[0].token;
  };
  //
  const navigate = useNavigate();
  const getUser = async () => {
    const customerID = JSON.parse(
      localStorage.getItem("tcm_client_customerID")
    );
    const token = Cookies.get("tcm_client_token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      const res = await axios.post(`${url}/getuser`, {
        customerID,
        token,
      });
      if (res.data.success === false) {
        if (res.data.code === 400) {
          window.alert(res.data.message);
        } else if (res.data.code === 401) {
          await generateToken();
          await getUser();
        }
      } else if (res.data.success === true) {
        setUser(res.data.result);
        setCount(res.data.result.Step);
        //
        if (
          res.data.result.Step === "" ||
          res.data.result.Step === "1" ||
          res.data.result.Step === "2" ||
          res.data.result.Step === "3"
        ) {
          navigate("/customerdetails", { replace: true });
        }
      }
    }
  };
  //
  const [loading, setLoading] = useState(true);
  //
  const [length, setLength] = useState({
    noOfDebtors: 0,
    noOfInvoices: 0,
    cashCollected: 0,
    promiseTopay: 0,
    meritsOfCases: 0,
    legalActions: 0,
    abscondedCases: 0,
    liveInvoices: 0,
    disputedInvoices: 0,
    fieldVisits: 0,
  });
  const [noOfDebtors, setnoOfDebtors] = useState([]);
  const [noOfInvoices, setnoOfInvoices] = useState([]);
  const [cashCollected, setcashCollected] = useState([]);
  const [promiseTopay, setpromiseTopay] = useState([]);
  const [meritsOfCases, setmeritsOfCases] = useState([]);
  const [legalActions, setlegalActions] = useState([]);
  const [abscondedCases, setabscondedCases] = useState([]);
  const [liveInvoices, setliveInvoices] = useState([]);
  const [disputedInvoices, setdisputedInvoices] = useState([]);
  const [fieldVisits, setfieldVisits] = useState([]);
  //
  return (
    <AppContext.Provider
      value={{
        url,
        user,
        setUser,
        getUser,
        count,
        generateToken,
        loading,
        length,
        noOfDebtors,
        noOfInvoices,
        cashCollected,
        promiseTopay,
        meritsOfCases,
        legalActions,
        abscondedCases,
        liveInvoices,
        disputedInvoices,
        fieldVisits,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
