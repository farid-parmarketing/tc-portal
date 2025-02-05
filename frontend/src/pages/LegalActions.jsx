import React from "react";
import Header from "../components/Header";
import useFetch from "../utility/useFetch";

const LegalActions = () => {
  const { data1, data2, setData2, isLoading } = useFetch("legalcase");
  return (
    <>
      <div className="container">
        <Header title="Legal actions" />
        <div className="d-flex align-items-center justify-content-start gap-2 mb-2">
          <button className="button">csv</button>
          <button className="button">excel</button>
        </div>
        <div className="table-container">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ minWidth: "50px" }}>Sr</th>
                <th style={{ minWidth: "200px" }}>invoice uploaded date</th>
                <th style={{ minWidth: "200px" }}>reference number</th>
                <th style={{ minWidth: "400px" }}>debtor's company name</th>
                <th style={{ minWidth: "200px" }}>invoice number</th>
                <th style={{ minWidth: "150px" }}>invoice date</th>
                <th style={{ minWidth: "200px" }}>total outstanding</th>
                <th style={{ minWidth: "200px" }}>date of legal action</th>
                <th style={{ minWidth: "150px" }}>type of case</th>
                <th style={{ minWidth: "200px" }}>cheque bounce amount</th>
                <th style={{ minWidth: "200px" }}>amount recovered</th>
                <th style={{ minWidth: "150px" }}>notice status</th>
                <th style={{ minWidth: "150px" }}>complaint status</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                    <td>Lorem, ipsum.</td>
                    <td>Lorem, ipsum.</td>
                    <td>Active</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                    <td>9876543210</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LegalActions;
