import React, { useState } from "react";
import Header from "../components/Header";
import useFetch from "../utility/useFetch";
import Loader from "../components/Loader";
import { FaMinus, FaPlus } from "react-icons/fa";

const FieldVisits = () => {
  const { data1, data2, setData2, isLoading, page, increment, decrement } =
    useFetch("visited");
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = data1.filter((item) => {
      return item.Invoice_Ref_No.toLowerCase().includes(
        searchInput.toLowerCase()
      );
    });
    setData2(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Field visits" />
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
                        <th style={{ minWidth: "200px" }}>reference number</th>
                        <th style={{ minWidth: "150px" }}>date of visit</th>
                        <th style={{ minWidth: "200px" }}>For phase</th>
                        <th style={{ minWidth: "400px" }}>
                          visited company name
                        </th>
                        <th style={{ minWidth: "150px" }}>No of visits</th>
                        <th style={{ minWidth: "200px" }}>action</th>
                        <th style={{ minWidth: "100px" }}>PTP</th>
                        <th style={{ minWidth: "400px" }}>Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data2.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Invoice_Ref_No}</td>
                            <td>
                              {item.Visit_Date.split("-").reverse().join("-")}
                            </td>
                            <td>{item.For_phase}</td>
                            <td>9876543210</td>
                            <td>{item.No_of_Visit}</td>
                            <td>{item.Action}</td>
                            <td>9876543210</td>
                            <td>{item.FOS_Feedback}</td>
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

export default FieldVisits;
