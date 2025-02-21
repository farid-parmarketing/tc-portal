import React, { useContext } from "react";
import Steps from "../components/Steps";
import BusinessDetailsForm from "../Forms/BusinessDetailsForm";
import BankDetailsForm from "../Forms/BankDetailsForm";
import UploadDocumentsForm from "../Forms/UploadDocumentsForm";
import Payment from "../Forms/Payment";
import Modal from "../Modals/Modal";
import { AppContext } from "../context/AppContext";

const CustomerDetails = () => {
  const { user, count } = useContext(AppContext);
  return (
    <>
      <div className="container">
        {count !== "3" && <Steps />}
        {count === "" && <BusinessDetailsForm />}
        {count === "1" && <BankDetailsForm user={user} />}
        {count === "2" && <UploadDocumentsForm user={user} />}
        {count === "3" && <Payment user={user} />}
        <Modal />
      </div>
    </>
  );
};

export default CustomerDetails;
