import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import useFetch from "../utility/useFetch";
import Loader from "../components/Loader";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const CashCollected = () => {
  const { url, generateToken, user } = useContext(AppContext);
  //
  const [calculations, setCalculations] = useState({
    outstanding: 0,
    recovered: 0,
  });
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
      setPage((prev) => prev + 1);
    }
  };
  const decrement = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  //
  const getData = async () => {
    try {
      const token = await generateToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Debtor_Invoices/search?criteria=((Lead_Name:equals:${user.id})and(Invoice_Status:equals:Paid))&page=${page}`,
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
        //
        const data = res.data.data;
        data.forEach((obj) => {
          for (let item in obj) {
            if (obj[item] === null) {
              obj[item] = "";
            }
          }
        });
        //
        setData1(data);
        setData2(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [page]);
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
        <Header title="Cash collected" />
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
                        <th style={{ minWidth: "150px" }}>invoice date</th>
                        <th style={{ minWidth: "170px" }}>reference Number</th>
                        <th style={{ minWidth: "200px" }}>date of payment</th>
                        <th style={{ minWidth: "200px" }}>total outstanding</th>
                        <th style={{ minWidth: "200px" }}>amount recovered</th>
                        <th style={{ minWidth: "200px" }}>Invoice status</th>
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
                            <td>{item.Amount_Paid_Date}</td>
                            <td>{item.Total_Outstanding_Amount}</td>
                            <td>{item.Amount_Paid}</td>
                            <td>{item.Invoice_Status}</td>
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
                        <th>{calculations.recovered}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
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

export default CashCollected;
