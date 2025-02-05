import React, { useState } from "react";
import { FaEye, FaFile, FaUsers, FaPlus, FaMinus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../utility/useFetch";
import Loader from "../components/Loader";

const ExistingDebtor = () => {
  const { data1, data2, setData2, isLoading, page, increment, decrement } =
    useFetch("noofdebtors");
  //
  const tooltip1 = (
    <Tooltip id="tooltip-id1" className="text-capitalize">
      View
    </Tooltip>
  );
  const tooltip2 = (
    <Tooltip id="tooltip-id2" className="text-capitalize">
      All Invoices
    </Tooltip>
  );
  const tooltip3 = (
    <Tooltip id="tooltip-id3" className="text-capitalize">
      All directors or partners
    </Tooltip>
  );
  //
  const [searchInput, setSearchInput] = useState("");
  const searchData = () => {
    const filtered = data1.filter((item) => {
      return (
        item.Debtor_Name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.Debtor_Phone_Number.toLowerCase().includes(
          searchInput.toLowerCase()
        )
      );
    });
    setData2(filtered);
  };
  return (
    <>
      <div className="container">
        <Header title="Debtor's details" />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex align-items-md-center align-items-start justify-content-between gap-2 mb-4 flex-md-row flex-column">
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
              <div className="d-flex align-items-sm-center align-items-start justify-content-end gap-2 flex-sm-row flex-column">
                <Link to="/newdebtor" className="button bg-gradient">
                  Add a new debtor
                </Link>
                <Link to="/newinvoice" className="button">
                  Upload invoice
                </Link>
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
                        <th style={{ minWidth: "150px" }}>Number</th>
                        <th style={{ minWidth: "150px" }}>Status</th>
                        <th style={{ minWidth: "200px" }}>
                          Outstanding Amount
                        </th>
                        <th style={{ minWidth: "200px" }}>Amount recovered</th>
                        <th style={{ minWidth: "250px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data2.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Debtor_Name}</td>
                            <td>{item.Debtor_Phone_Number}</td>
                            <td>{item.Debtor_Status}</td>
                            <td>{item.Total_Outstanding_Amount}</td>
                            <td>9876543210</td>
                            <td>
                              <div className="d-flex align-items-center justify-content-start gap-2">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={tooltip1}
                                >
                                  <button className="button">
                                    <FaEye />
                                  </button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={tooltip2}
                                >
                                  <button className="button">
                                    <FaFile />
                                  </button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={tooltip3}
                                >
                                  <button className="button">
                                    <FaUsers />
                                  </button>
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="d-flex align-items-center justify-content-end gap-2 pt-2">
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

export default ExistingDebtor;
