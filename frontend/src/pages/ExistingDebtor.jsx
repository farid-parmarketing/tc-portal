import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaFile, FaUsers, FaPlus, FaMinus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";

const ExistingDebtor = () => {
  const { noOfDebtors, ITEMS_PER_PAGE } = useContext(AppContext);
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (noOfDebtors) {
      setData(noOfDebtors);
    }
  }, [noOfDebtors]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(noOfDebtors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  //
  const [filters, setFilters] = useState({
    searchInput: "",
    status: "",
  });
  const handleSearchInput = (e) => {
    setFilters((prev) => ({
      ...prev,
      searchInput: e.target.value,
    }));
  };
  //
  const searchData = () => {
    const filtered = noOfDebtors.filter((item) => {
      const matchesSearch =
        item.Name.toLowerCase().includes(filters.searchInput.toLowerCase()) ||
        item.Debtor_Phone_Number.includes(filters.searchInput);

      const matchesStatus =
        !filters.status ||
        item.Debtor_Status.trim().toLowerCase() ===
          filters.status.trim().toLowerCase();

      return matchesSearch && matchesStatus;
    });

    setData(filtered);
  };
  useEffect(() => {
    searchData();
  }, [filters]);
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
  return (
    <>
      <div className="container">
        <Header title="Debtor's details" />
        <>
          <div className="d-flex align-items-md-center align-items-start justify-content-between gap-2 mb-4 flex-md-row flex-column">
            <input
              type="text"
              placeholder="Search"
              style={{ width: "100%", maxWidth: "200px" }}
              className="input"
              value={filters.searchInput}
              onChange={handleSearchInput}
              disabled={noOfDebtors.length === 0 ? true : false}
            />
            <div className="d-flex align-items-sm-center align-items-start justify-content-end gap-2 flex-sm-row flex-column">
              <Link to="/newdebtor" className="button bg-gradient">
                Add a new debtor
              </Link>
            </div>
          </div>
          {data.length === 0 ? (
            <p className="text-center py-4">No data found</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>Sr</th>
                      <th style={{ minWidth: "400px" }}>debtor Company name</th>
                      <th style={{ minWidth: "150px" }}>Number</th>
                      <th style={{ minWidth: "230px" }}>Status</th>
                      <th style={{ minWidth: "200px" }}>Outstanding Amount</th>
                      <th style={{ minWidth: "200px" }}>Amount recovered</th>
                      <th style={{ minWidth: "160px" }}>Add Invoice</th>
                      <th style={{ minWidth: "250px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Name}</td>
                          <td>{item.Debtor_Phone_Number}</td>
                          <td>{item.Debtor_Status}</td>
                          <td>
                            {item.Balance_O_D !== "-" && "Rs"}{" "}
                            {item.Balance_O_D}
                          </td>
                          <td>
                            {item.Payment_Received !== "-" && "Rs"}{" "}
                            {item.Payment_Received}
                          </td>
                          <td>
                            <button className="button">Add invoice</button>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-start gap-2">
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip1}
                              >
                                <Link
                                  className="button view-button"
                                  to={`/viewdebtor/${item.id}`}
                                >
                                  <FaEye />
                                </Link>
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

export default ExistingDebtor;
