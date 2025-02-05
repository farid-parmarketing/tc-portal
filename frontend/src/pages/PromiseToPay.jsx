import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useFetch from "../utility/useFetch";
import Loader from "../components/Loader";
import { FaMinus, FaPlus } from "react-icons/fa";

const PromiseToPay = () => {
  const { data1, data2, setData2, isLoading, page, increment, decrement } =
    useFetch("promisetopay");
  //
  const [calculations, setCalculations] = useState({
    outstanding: 0,
    promised: 0,
  });
  useEffect(() => {
    if (data1.length !== 0) {
      let outstanding = 0;
      let promised = 0;
      data1.forEach((item) => {
        outstanding += item.Total_Outstanding_Amount;
        promised += item.Promise_to_Pay_Amount;
      });
      setCalculations({
        outstanding: outstanding.toFixed(2),
        promised: promised.toFixed(2),
      });
    }
  }, [data1]);
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
        <Header title="Promise to pay" />
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
                          debtor Company name
                        </th>
                        <th style={{ minWidth: "200px" }}>invoice number</th>
                        <th style={{ minWidth: "200px" }}>invoice date</th>
                        <th style={{ minWidth: "200px" }}>frequency</th>
                        <th style={{ minWidth: "200px" }}>total outstanding</th>
                        <th style={{ minWidth: "200px" }}>Promise to pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data2.map((item, index) => {
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

export default PromiseToPay;
