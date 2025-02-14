import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const MeritsOfCases = () => {
  const { meritsOfCases, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (meritsOfCases) {
      setData(meritsOfCases);
    }
  }, [meritsOfCases]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(meritsOfCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = meritsOfCases.filter((item) => {
      return (
        item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.Debtor_Phone_Number.toLowerCase().includes(
          searchInput.toLowerCase()
        ) ||
        item.Email.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setData(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Merits of cases" />
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
              disabled={meritsOfCases.length === 0 ? true : false}
            />
            <div className="d-flex align-items-center justify-content-betweeb gap-2">
              <button className="button">csv</button>
              <button className="button">excel</button>
            </div>
          </div>
          {meritsOfCases.length === 0 ? (
            <p className="text-center py-4">No data found</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "400px" }}>debtor Company name</th>
                      <th style={{ minWidth: "150px" }}>debtor Number</th>
                      <th style={{ minWidth: "250px" }}>debtor email</th>
                      <th style={{ minWidth: "150px" }}>status</th>
                      <th style={{ minWidth: "200px" }}>merits of cases</th>
                      <th style={{ minWidth: "150px" }}>case status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Name}</td>
                          <td>{item.Debtor_Phone_Number}</td>
                          <td>{item.Email}</td>
                          <td>{item.Debtor_Status}</td>
                          <td className="sentence">{item.Merits_Case_List}</td>
                          <td>{item.Case_Status}</td>
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

export default MeritsOfCases;
