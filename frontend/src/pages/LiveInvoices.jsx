import React, { useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import useFetch from "../utility/useFetch";
import { FaMinus, FaPlus } from "react-icons/fa";

const LiveInvoices = () => {
  const { data1, data2, setData2, isLoading, page, increment, decrement } =
    useFetch("liveinvoices");
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = data1.filter((item) => {
      return (
        item.Debtor_Name1.name
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        item.Invoice_Ref_No.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setData2(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Live invoices" />
        {isLoading ? (
          <Loader />
        ) : (
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
                disabled={data1.length === 0 ? true : false}
              />
              <div className="d-flex align-items-center justify-content-betweeb gap-2">
                <button className="button">csv</button>
                <button className="button">excel</button>
              </div>
            </div>
            {data1.length === 0 ? (
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
                        <th style={{ minWidth: "200px" }}>invoice date</th>
                        <th style={{ minWidth: "200px" }}>reference number</th>
                        <th style={{ minWidth: "150px" }}>outstanding</th>
                        <th style={{ minWidth: "150px" }}>No of days</th>
                        <th style={{ minWidth: "150px" }}>Interest charged</th>
                        <th style={{ minWidth: "150px" }}>interest amount</th>
                        <th style={{ minWidth: "150px" }}>Delivery challan</th>
                        <th style={{ minWidth: "150px" }}>delivery date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data2.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Debtor_Name1.name}</td>
                            <td>
                              {item.Invoice_Date.split("-").reverse().join("-")}
                            </td>
                            <td>{item.Invoice_Ref_No}</td>
                            <td>{item.Total_Outstanding_Amount}</td>
                            <td>{item.No_of_Days_Delayed}</td>
                            <td>{item.Interest_Percentage}</td>
                            <td>{item.Interest_Amount_Payment}</td>
                            <td>{item.Delivery_Challan_No}</td>
                            <td>{item.Delivery_Date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="pagination-buttons">
              <button className="button" onClick={decrement}>
                <FaMinus />
              </button>
              <h2>{page}</h2>
              <button
                className="button"
                onClick={increment}
                disabled={data1.length === 0 ? true : false}
              >
                <FaPlus />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LiveInvoices;
