import React, { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaEye, FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header";
import Loader from "../components/Loader";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const InvoiceList = () => {
  const { url, generateToken, user } = useContext(AppContext);
  const tooltip1 = (
    <Tooltip id="tooltip-id1" className="text-capitalize">
      View
    </Tooltip>
  );
  //
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [moreRecords, setMoreRecords] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  //
  const increment = () => {
    if (moreRecords) {
      setPage((prevPage) => prevPage + 1); // Functional update ensures latest value
    }
  };

  const decrement = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  //
  useEffect(() => {
    console.log(page);
    const fetchData = async () => {
      try {
        const token = await generateToken();
        const res = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:321959000000612317))&page=2`,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const { more_records } = res.data.info;
          setMoreRecords(more_records);
          console.log(res.data.info);

          const data = res.data.data;
          data.forEach((obj) => {
            for (let item in obj) {
              if (obj[item] === null) {
                obj[item] = "";
              }
            }
          });

          setData1(data);
          setData2(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // Dependency array ensures `fetchData` runs when `page` updates

  //
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
        <Header title="All invoices list" />
        {loading ? (
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
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "400px" }}>debtor Company name</th>
                      <th style={{ minWidth: "150px" }}>invoice Number</th>
                      <th style={{ minWidth: "200px" }}>invoice amount</th>
                      <th style={{ minWidth: "200px" }}>invoice date</th>
                      <th style={{ minWidth: "200px" }}>invoice due date</th>
                      <th style={{ minWidth: "200px" }}>interest percentage</th>
                      <th style={{ minWidth: "200px" }}>interest Amount</th>
                      <th style={{ minWidth: "100px" }}>Action</th>
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
                            {item.Invoice_Amount === ""
                              ? "-"
                              : `Rs ${item.Invoice_Amount}`}
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
                            {item.Interest_Percentage === ""
                              ? "-"
                              : `${item.Interest_Percentage}%`}
                          </td>
                          <td>
                            {item.Interest_Amount_Payment === ""
                              ? "-"
                              : `Rs ${item.Interest_Amount_Payment}`}
                          </td>
                          <td>
                            <OverlayTrigger placement="top" overlay={tooltip1}>
                              <button className="button">
                                <FaEye />
                              </button>
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
                className={`button ${page === 1 ? "disabled" : ""}`}
                onClick={decrement}
                disabled={page === 1}
              >
                <FaMinus />
              </button>

              <h2>{page}</h2>

              <button
                className={`button ${!moreRecords ? "disabled" : ""}`}
                onClick={increment}
                disabled={!moreRecords}
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

export default InvoiceList;
