import React, { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaEye, FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const { noOfInvoices, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (noOfInvoices) {
      setData(noOfInvoices);
    }
  }, [noOfInvoices]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(noOfInvoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = noOfInvoices.filter((item) => {
      const matchesSearch =
        item.Debtor_Name1.name
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        item.Invoice_Ref_No.includes(searchInput);

      return matchesSearch;
    });
    setData(filtered);
  };
  useEffect(() => {
    searchData();
  }, [searchInput]);
  //
  const tooltip1 = (
    <Tooltip id="tooltip-id1" className="text-capitalize">
      View
    </Tooltip>
  );
  return (
    <>
      <div className="container">
        <Header title="All invoices list" />
        <>
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <input
              type="text"
              placeholder="Search"
              style={{ width: "100%", maxWidth: "200px" }}
              className="input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={noOfInvoices.length === 0 ? true : false}
            />
            <div className="d-flex align-items-center justify-content-betweeb gap-2">
              <button className="button">csv</button>
              <button className="button">excel</button>
            </div>
          </div>
          <>
            <div className="table-container">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th style={{ minWidth: "50px" }}>Sr</th>
                    <th style={{ minWidth: "400px" }}>debtor Company name</th>
                    <th style={{ minWidth: "150px" }}>invoice Number</th>
                    <th style={{ minWidth: "150px" }}>invoice amount</th>
                    <th style={{ minWidth: "150px" }}>invoice date</th>
                    <th style={{ minWidth: "170px" }}>invoice due date</th>
                    <th style={{ minWidth: "170px" }}>interest percentage</th>
                    <th style={{ minWidth: "150px" }}>interest Amount</th>
                    <th style={{ minWidth: "100px" }}>Action</th>
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
                          {item.Invoice_Amount !== "-" && "Rs"}{" "}
                          {item.Invoice_Amount}
                        </td>
                        <td>
                          {item.Invoice_Date.split("-").reverse().join("-")}
                        </td>
                        <td>
                          {item.Due_Date === ""
                            ? "-"
                            : item.Due_Date.split("-").reverse().join("-")}
                        </td>
                        <td>
                          {item.Interest_Percentage}
                          {item.Interest_Percentage !== "-" && "%"}{" "}
                        </td>
                        <td>
                          {item.Interest_Amount_Payment !== "-" && "Rs"}{" "}
                          {item.Interest_Amount_Payment}
                        </td>
                        <td>
                          <OverlayTrigger placement="top" overlay={tooltip1}>
                            <Link
                              className="button view-button"
                              to={`/viewinvoice/${item.id}`}
                            >
                              <FaEye />
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
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

export default InvoiceList;
