import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaTimes } from "react-icons/fa";

const NotesModal = ({ id }) => {
  const { url, generateToken } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    try {
      const token = await generateToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtors_Details/${id}/Notes`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data.data;
        data.forEach((item) => {
          for (let i in item) {
            if (item[i] === null) {
              item[i] = "";
            }
          }
          //
          const date = new Date(item.Created_Time);
          item.formattedDate = date.toLocaleDateString("en-US");
          item.formattedTime = date.toLocaleTimeString("en-US");
        });
        setNotes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <div
        className="modal fade"
        id="notesModal"
        tabIndex="-1"
        aria-labelledby="notesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-2">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2>Notes</h2>
              <button
                className="button"
                data-bs-toggle="modal"
                data-bs-target="#notesModal"
              >
                <FaTimes />
              </button>
            </div>
            {notes.length === 0 ? (
              <p className="text-center">No notes to show</p>
            ) : (
              <>
                <ul className="ps-4">
                  {notes.map((item, index) => {
                    return (
                      <li
                        className={index === notes.length - 1 ? "" : "mb-3"}
                        key={index}
                      >
                        <p className="fw-bold">{item.Note_Content}</p>
                        <p>
                          Timestamps: {item.formattedDate} at{" "}
                          {item.formattedTime}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesModal;
