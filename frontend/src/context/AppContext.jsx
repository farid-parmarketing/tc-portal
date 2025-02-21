import React, { createContext, useState } from "react";
import axios from "axios";

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
  const ITEMS_PER_PAGE = 500;
  return (
    <AppContext.Provider
      value={{
        url,
        user,
        setUser,
        count,
        setCount,
        generateToken,
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
        ITEMS_PER_PAGE,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
