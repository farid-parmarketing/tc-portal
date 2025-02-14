import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const FieldVisits = () => {
  const { fieldVisits, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (fieldVisits) {
      setData(fieldVisits);
    }
  }, [fieldVisits]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(fieldVisits.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = fieldVisits.filter((item) => {
      return (
        item.Invoice_Ref_No.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.Invoice_Ref_No.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setData(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Field visits" />
        <>
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <input
              type="text"
              placeholder="Search"
              style={{ width: "100%", maxWidth: "200px" }}
              className="input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={searchData}
              disabled={fieldVisits.length === 0 ? true : false}
            />
            <div className="d-flex align-items-center justify-content-betweeb gap-2">
              <button className="button">csv</button>
              <button className="button">excel</button>
            </div>
          </div>
          {fieldVisits.length === 0 ? (
            <p className="text-center py-4">No data found</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "200px" }}>reference number</th>
                      <th style={{ minWidth: "150px" }}>date of visit</th>
                      <th style={{ minWidth: "200px" }}>For phase</th>
                      <th style={{ minWidth: "400px" }}>
                        visited company name
                      </th>
                      <th style={{ minWidth: "150px" }}>No of visits</th>
                      <th style={{ minWidth: "200px" }}>action</th>
                      <th style={{ minWidth: "150px" }}>PTP</th>
                      <th style={{ minWidth: "400px" }}>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Invoice_Ref_No}</td>
                          <td>
                            {item.Visit_Date.split("-").reverse().join("-")}
                          </td>
                          <td>{item.For_phase}</td>
                          <td>{item.Debtor_Name}</td>
                          <td>{item.No_of_Visit}</td>
                          <td>{item.Action}</td>
                          <td>{item.Promise_To_Pay}</td>
                          <td className="sentence">{item.FOS_Feedback}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="d-flex align-items-center justify-content-end gap-2 pt-2">
            <button
              className={`button ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaMinus />
            </button>

            <h2>{currentPage} </h2>

            <button
              className={`button ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaPlus />
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default FieldVisits;
