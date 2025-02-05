import React, { useContext, useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Cookies from "js-cookie";

const UploadDocumentsForm = ({ user }) => {
  const { url, generateToken, getUser } = useContext(AppContext);
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState(null);
  const [msmeNumber, setmsmeNumber] = useState(null);
  const [cancelledCheque, setcancelledCheque] = useState(null);
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const uploadDocuments = async (e) => {
    e.preventDefault();
    if (tradeLicenseNumber === null) {
      setIsError(true);
      setMessage("Please upload your Trade License Number document");
    } else if (msmeNumber === null) {
      setIsError(true);
      setMessage("Please upload your MSME Number document");
    } else if (cancelledCheque === null) {
      setIsError(true);
      setMessage("Please upload your Cancelled Cheque document");
    } else {
      const formData = new FormData();
      formData.append("tradeLicenseNumber", tradeLicenseNumber);
      formData.append("msmeNumber", msmeNumber);
      formData.append("cancelledCheque", cancelledCheque);
      //
      const token = Cookies.get("tcm_client_token");
      try {
        const maxFileSizeInMB = 5;
        const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
        if (tradeLicenseNumber.size > maxFileSizeInKB) {
          setIsError(true);
          setMessage(`Trade License Number file size is ${maxFileSizeInMB}mb`);
        } else if (msmeNumber.size > maxFileSizeInKB) {
          setIsError(true);
          setMessage(`MSME Number file size is ${maxFileSizeInMB}mb`);
        } else if (cancelledCheque.size > maxFileSizeInKB) {
          setIsError(true);
          setMessage(`Cancelled Cheque file size is ${maxFileSizeInMB}mb`);
        } else {
          const res = await axios.post(`${url}/uploaddocuments`, formData);
          if (res.status === 200) {
            const res2 = await axios.post(`${url}/confirmdocuments`, {
              tradeLicenseNumber: res.data.result.tradeLicenseNumberURL,
              msmeNumber: res.data.result.msmeNumberURL,
              cancelledCheque: res.data.result.cancelledChequeURL,
              customerID: user.id,
              token: token,
            });
            //
            if (res2.data.success === true) {
              setIsError(false);
              setMessage(res2.data.message);
              getUser();
            } else if (res2.data.success === false) {
              if (res2.data.code === 400) {
                setIsError(true);
                setMessage(
                  "Token expired. Limit reached. Please retry after some time."
                );
              } else if (res2.data.code === 401) {
                setIsError(true);
                setMessage("Token expired. Please try again.");
                generateToken();
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <>
      <form>
        <div className="details-form">
          <div>
            <label>Trade License Number</label>
            <input
              type="file"
              className="input"
              onChange={(e) => setTradeLicenseNumber(e.target.files[0])}
            />
          </div>
          <div>
            <label>MSME number</label>
            <input
              type="file"
              className="input"
              onChange={(e) => setmsmeNumber(e.target.files[0])}
            />
          </div>
          <div>
            <label>cancelled cheque</label>
            <input
              type="file"
              className="input"
              onChange={(e) => setcancelledCheque(e.target.files[0])}
            />
          </div>
          <div>
            <label>Notes</label>
            <textarea className="input"></textarea>
          </div>
        </div>
        <p
          className={`text-end mt-4 ${
            isError ? "text-danger" : "text-success"
          }`}
        >
          {message}
        </p>
        <div className="d-flex align-items-center justify-content-end">
          <button className="button icon-button" onClick={uploadDocuments}>
            Next
            <FaChevronRight />
          </button>
        </div>
      </form>
    </>
  );
};

export default UploadDocumentsForm;
