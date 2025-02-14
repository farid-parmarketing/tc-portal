import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const AbscondedCases = () => {
  const { abscondedCases, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (abscondedCases) {
      setData(abscondedCases);
    }
  }, [abscondedCases]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(abscondedCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = abscondedCases.filter((item) => {
      return item.Debtor_Name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setData(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="absconded cases" />
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
              disabled={abscondedCases.length === 0 ? true : false}
            />
            <div className="d-flex align-items-center justify-content-betweeb gap-2">
              <button className="button">csv</button>
              <button className="button">excel</button>
            </div>
          </div>
          {abscondedCases.length === 0 ? (
            <p className="text-center py-4">No data found</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "400px" }}>
                        debtor's company name
                      </th>
                      <th style={{ minWidth: "150px" }}>debtor's status</th>
                      <th style={{ minWidth: "150px" }}>absconded date</th>
                      <th style={{ minWidth: "150px" }}>absconded informed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Debtor_Name}</td>
                          <td>{item.Debtor_Status}</td>
                          <td>
                            {item.Absconded_Date.split("-").reverse().join("-")}
                          </td>
                          <td>{item.Absconded_Informed}</td>
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

export default AbscondedCases;
