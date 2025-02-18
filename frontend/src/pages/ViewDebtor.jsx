import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  FaEnvelope,
  FaHashtag,
  FaPhoneAlt,
  FaRupeeSign,
  FaUser,
  FaWhatsapp,
  FaBusinessTime,
} from "react-icons/fa";
import Loader from "../components/Loader";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { MdWork } from "react-icons/md";
import { FaListCheck, FaLocationDot, FaNoteSticky } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { GrValidate } from "react-icons/gr";
import NotesModal from "../Modals/NotesModal";

const ViewDebtor = () => {
  const { url, generateToken } = useContext(AppContext);
  const { id } = useParams();
  const [debtor, setDebtor] = useState(null);
  const fetchDebtor = async () => {
    try {
      const token = await generateToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtors_Details/${id}`,
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
      setDebtor(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDebtor();
  }, []);
  //
  return (
    <>
      <div className="container">
        <Header title="Debtor's details" />
        {debtor !== null ? (
          <>
            <div className="basic-details-grid">
              <div>
                <div className="name-icon-flex">
                  <FaUser />
                  <p>Debtor's Company name</p>
                </div>
                <h2>{debtor.Name}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaPhoneAlt />
                  <p>Mobile number</p>
                </div>
                <h2>{debtor.Debtor_Phone_Number}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaWhatsapp />
                  <p>Whatsapp number</p>
                </div>
                <h2>{debtor.WhatsApp_Number}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <TbDeviceLandlinePhone />
                  <p>Land Line Telephone Number</p>
                </div>
                <h2>{debtor.Email}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaEnvelope />
                  <p>Email Address</p>
                </div>
                <h2>{debtor.Email}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaLocationDot />
                  <p>Debtor State</p>
                </div>
                <h2>{debtor.Debtors_State}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaLocationDot />
                  <p>Debtor City</p>
                </div>
                <h2>{debtor.Debtor_City}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaRupeeSign />
                  <p>Balance Outstanding</p>
                </div>
                <h2>{debtor.Balance_O_D}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <MdWork />
                  <p>Position In Business</p>
                </div>
                <h2>{debtor.Position_In_business}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <MdWork />
                  <p>Debtor's Business Still Trading</p>
                </div>
                <h2>{debtor.CIN}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaLocationDot />
                  <p>Debtor's Business Address</p>
                </div>
                <h2>{debtor.Business_Still_trading}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaLocationDot />
                  <p>Debtor's Home Address</p>
                </div>
                <h2>{debtor.Home_Address_Of_Debtor}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaNoteSticky />
                  <p>Notes</p>
                </div>
                <h2 className="sentence">{debtor.Debtors_Notes}</h2>
                <button
                  className="button"
                  data-bs-toggle="modal"
                  data-bs-target="#notesModal"
                >
                  View notes
                </button>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaHashtag />
                  <p>Debtor's GST Number</p>
                </div>
                <h2>{debtor.GST_number_of_Debtors_business}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <MdWork />
                  <p>Debtor Type Of company</p>
                </div>
                <h2>{debtor.Type_Of_Company}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaBusinessTime />
                  <p>Debtor's Status</p>
                </div>
                <h2>{debtor.Debtor_Status}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <FaListCheck />
                  <p>Merits Of Cases List</p>
                </div>
                <p>--</p>
              </div>
              <div>
                <div className="name-icon-flex">
                  <BsCalendarDateFill />
                  <p>Absconded Date</p>
                </div>
                <h2>{debtor.Absconded_Date}</h2>
              </div>
              <div>
                <div className="name-icon-flex">
                  <GrValidate />
                  <p>Absconded Informed</p>
                </div>
                <h2>{debtor.Absconded_Informed}</h2>
              </div>
            </div>
            <NotesModal id={id} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ViewDebtor;
