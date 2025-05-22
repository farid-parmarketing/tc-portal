import React, { useContext, useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UploadDocumentsForm = ({ user }) => {
  const { url, generateToken } = useContext(AppContext);
  const navigate = useNavigate();
  //
  const [documents, setDocuments] = useState({
    pan: null,
    aadhar: null,
    gst: null,
    companyPan: null,
    cin: null,
    msme: null,
  });
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!allowedFileTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, and PDF files are allowed!");
      e.target.value = "";
      return;
    }

    setDocuments((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));
  };
  //
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const uploadDocuments = async (e) => {
    e.preventDefault();

    const allFilesPresent = Object.values(documents).every(
      (file) => file !== null
    );
    if (!allFilesPresent) {
      setIsError(true);
      setMessage("Please upload all required documents.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    const oversizedFiles = Object.entries(documents).filter(
      ([key, file]) => file && file.size > maxSize
    );
    if (oversizedFiles.length > 0) {
      alert(
        `The following files exceed 2MB:\n${oversizedFiles
          .map(([key]) => key)
          .join(", ")}`
      );
      return;
    }

    // Create FormData object
    const formData = new FormData();
    Object.entries(documents).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file); // Append field name (key) along with file
      }
    });

    try {
      const res = await axios.post(`${url}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        const fieldURL = {
          pan: "",
          aadhar: "",
          gst: "",
          companyPan: "",
          cin: "",
          msme: "",
        };
        res.data.files.forEach((item) => {
          fieldURL[item.fieldName] = item.filename;
        });
        const data = [
          {
            Pan_Card_URL: `https://api.tauruscollection.com/public/${fieldURL.pan}`,
            Aadhar_Card_URL: `https://api.tauruscollection.com/public/${fieldURL.aadhar}`,
            GST_URL: `https://api.tauruscollection.com/public/${fieldURL.gst}`,
            Company_Pan_URL: `https://api.tauruscollection.com/public/${fieldURL.companyPan}`,
            CIN_Number_URL: `https://api.tauruscollection.com/public/${fieldURL.cin}`,
            MSME_Number_URL: `https://api.tauruscollection.com/public/${fieldURL.msme}`,
            Step: "3",
          },
        ];
        const token = await generateToken();
        const zRes = await axios.put(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${user.id}`,
          data,
          {
            headers: { Authorization: `Zoho-oauthtoken ${token}` },
          }
        );
        if (zRes.status === 200) {
          setIsError(false);
          setMessage("Files uploaded successfully");
          setDocuments({
            pan: null,
            aadhar: null,
            gst: null,
            companyPan: null,
            cin: null,
            msme: null,
          });
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
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
            <label>PAN card</label>
            <input
              type="file"
              className="input"
              name="pan"
              onChange={handleFile}
            />
          </div>
          <div>
            <label>Aadhar card</label>
            <input
              type="file"
              className="input"
              name="aadhar"
              onChange={handleFile}
            />
          </div>
          <div>
            <label>GST</label>
            <input
              type="file"
              className="input"
              name="gst"
              onChange={handleFile}
            />
          </div>
          <div>
            <label>Company PAN card</label>
            <input
              type="file"
              className="input"
              name="companyPan"
              onChange={handleFile}
            />
          </div>
          <div>
            <label>CIN</label>
            <input
              type="file"
              className="input"
              name="cin"
              onChange={handleFile}
            />
          </div>
          <div>
            <label>MSME number</label>
            <input
              type="file"
              className="input"
              name="msme"
              onChange={handleFile}
            />
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
