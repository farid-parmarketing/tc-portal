import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const PromiseToPay = () => {
  const { promiseTopay, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [calculations, setCalculations] = useState({
    outstanding: 0,
    promised: 0,
  });
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (promiseTopay) {
      setData(promiseTopay);
    }
    //
    let temp1 = 0;
    let temp2 = 0;
    promiseTopay.forEach((item) => {
      temp1 += parseFloat(item.Total_Outstanding_Amount);
      temp2 += parseFloat(item.Promise_to_Pay_Amount);
    });
    setCalculations({
      outstanding: temp1.toFixed(2),
      promised: temp2.toFixed(2),
    });
  }, [promiseTopay]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(promiseTopay.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = promiseTopay.filter((item) => {
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
        <Header title="Promise to pay" />
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
              disabled={promiseTopay.length === 0 ? true : false}
            />
            <div className="d-flex align-items-center justify-content-betweeb gap-2">
              <button className="button">csv</button>
              <button className="button">excel</button>
            </div>
          </div>
          {promiseTopay.length === 0 ? (
            <p className="text-center py-4">No data found</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "400px" }}>debtor Company name</th>
                      <th style={{ minWidth: "150px" }}>invoice number</th>
                      <th style={{ minWidth: "150px" }}>invoice date</th>
                      <th style={{ minWidth: "150px" }}>frequency</th>
                      <th style={{ minWidth: "150px" }}>total outstanding</th>
                      <th style={{ minWidth: "150px" }}>Promise to pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Debtor_Name1.name}</td>
                          <td>{item.Invoice_Ref_No}</td>
                          <td>
                            {item.Invoice_Date.split("-").reverse().join("-")}
                          </td>
                          <td>{item.Frequency}</td>
                          <td>{item.Total_Outstanding_Amount}</td>
                          <td>{item.Promise_to_Pay_Amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="5" className="text-end pe-5">
                        Total
                      </th>
                      <th>{calculations.outstanding}</th>
                      <th>{calculations.promised}</th>
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

export default PromiseToPay;
