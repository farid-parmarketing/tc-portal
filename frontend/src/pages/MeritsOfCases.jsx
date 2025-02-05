import React, { useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import useFetch from "../utility/useFetch";
import { FaMinus, FaPlus } from "react-icons/fa";

const MeritsOfCases = () => {
  const { data1, data2, setData2, isLoading, page, increment, decrement } =
    useFetch("meritsofcases");
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = data1.filter((item) => {
      return (
        item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.Debtor_Phone_Number.toLowerCase().includes(
          searchInput.toLowerCase()
        ) ||
        item.Email.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setData2(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Merits of cases" />
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
                        <th style={{ minWidth: "150px" }}>debtor Number</th>
                        <th style={{ minWidth: "250px" }}>debtor email</th>
                        <th style={{ minWidth: "150px" }}>status</th>
                        <th style={{ minWidth: "200px" }}>merits of cases</th>
                        <th style={{ minWidth: "150px" }}>case status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data2.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Name}</td>
                            <td>{item.Debtor_Phone_Number}</td>
                            <td>{item.Email}</td>
                            <td>{item.Debtor_Status}</td>
                            <td>9876543210</td>
                            <td>{item.Case_Status}</td>
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

export default MeritsOfCases;
