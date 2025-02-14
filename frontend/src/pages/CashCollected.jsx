import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const CashCollected = () => {
  const { cashCollected, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [calculations, setCalculations] = useState({
    outstanding: 0,
    recovered: 0,
  });
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (cashCollected) {
      setData(cashCollected);
    }
    //
    let temp1 = 0;
    let temp2 = 0;
    cashCollected.forEach((item) => {
      temp1 += parseFloat(item.Total_Outstanding_Amount);
      temp2 += parseFloat(item.Amount_Paid);
    });
    setCalculations({
      outstanding: temp1.toFixed(2),
      recovered: temp2.toFixed(2),
    });
  }, [cashCollected]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cashCollected.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = cashCollected.filter((item) => {
      return (
        item.Debtor_Name1.name
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        item.Invoice_Ref_No.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setData(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Cash collected" />
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
              disabled={cashCollected.length === 0 ? true : false}
            />
            <div className="d-flex align-items-center justify-content-betweeb gap-2">
              <button className="button">csv</button>
              <button className="button">excel</button>
            </div>
          </div>
          {cashCollected.length === 0 ? (
            <p className="text-center py-4">No data found</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "400px" }}>debtor Company name</th>
                      <th style={{ minWidth: "150px" }}>invoice date</th>
                      <th style={{ minWidth: "170px" }}>reference Number</th>
                      <th style={{ minWidth: "150px" }}>date of payment</th>
                      <th style={{ minWidth: "150px" }}>Invoice status</th>
                      <th style={{ minWidth: "170px" }}>total outstanding</th>
                      <th style={{ minWidth: "170px" }}>amount recovered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Debtor_Name1.name}</td>
                          <td>
                            {item.Invoice_Date.split("-").reverse().join("-")}
                          </td>
                          <td>{item.Invoice_Ref_No}</td>
                          <td>{item.Amount_Paid_Date}</td>
                          <td>{item.Invoice_Status}</td>
                          <td>
                            Rs{" "}
                            {item.Total_Outstanding_Amount.toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>Rs {item.Amount_Paid.toLocaleString("en-IN")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="6" className="text-end pe-5">
                        Total
                      </th>
                      <th>
                        Rs {calculations.outstanding.toLocaleString("en-IN")}
                      </th>
                      <th>Rs {calculations.recovered}</th>
                    </tr>
                  </tfoot>
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

export default CashCollected;
