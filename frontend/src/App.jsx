import React from "react";
import { AppContextProvider } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CustomerDetails from "./pages/CustomerDetails";
import Payment from "./components/Payment";
import BasicDetails from "./pages/BasicDetails";
import ExistingDebtor from "./pages/ExistingDebtor";
import NewDebtor from "./pages/NewDebtor";
import InvoiceList from "./pages/InvoiceList";
import CashCollected from "./pages/CashCollected";
import PromiseToPay from "./pages/PromiseToPay";
import MeritsOfCases from "./pages/MeritsOfCases";
import LegalActions from "./pages/LegalActions";
import Footer from "./components/Footer";
import AbscondedCases from "./pages/AbscondedCases";
import LiveInvoices from "./pages/LiveInvoices";
import DisputedInvoices from "./pages/DisputedInvoices";
import FieldVisits from "./pages/FieldVisits";
import Profile from "./pages/Profile";
import Auth from "./utility/Auth";
import NewInvoice from "./pages/NewInvoice";
import ViewDebtor from "./pages/ViewDebtor";
import ViewInvoiceList from "./pages/ViewInvoiceList";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Auth Component={Home} />} />
          {/*  */}
          <Route
            path="/customerdetails"
            element={<Auth Component={CustomerDetails} />}
          />
          <Route
            path="/basicdetails"
            element={<Auth Component={BasicDetails} />}
          />
          <Route
            path="/existingdebtor"
            element={<Auth Component={ExistingDebtor} />}
          />
          <Route
            path="/viewdebtor/:id"
            element={<Auth Component={ViewDebtor} />}
          />
          <Route path="/newdebtor" element={<Auth Component={NewDebtor} />} />
          <Route path="/newinvoice" element={<Auth Component={NewInvoice} />} />
          <Route
            path="/invoicelist"
            element={<Auth Component={InvoiceList} />}
          />
          <Route
            path="/viewinvoicelist/:id"
            element={<Auth Component={ViewInvoiceList} />}
          />
          <Route
            path="/cashcollected"
            element={<Auth Component={CashCollected} />}
          />
          <Route
            path="/promisetopay"
            element={<Auth Component={PromiseToPay} />}
          />
          <Route
            path="/meritsofcases"
            element={<Auth Component={MeritsOfCases} />}
          />
          <Route
            path="/legalactions"
            element={<Auth Component={LegalActions} />}
          />
          <Route
            path="/abscondedcases"
            element={<Auth Component={AbscondedCases} />}
          />
          <Route
            path="/liveinvoices"
            element={<Auth Component={LiveInvoices} />}
          />
          <Route
            path="/disputedinvoices"
            element={<Auth Component={DisputedInvoices} />}
          />
          <Route
            path="/fieldvisits"
            element={<Auth Component={FieldVisits} />}
          />
          <Route path="/profile" element={<Auth Component={Profile} />} />
          <Route path="/payment" element={<Auth Component={Payment} />} />
          {/*  */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </AppContextProvider>
    </>
  );
};

export default App;
