import React, { useContext, useEffect, useState } from "react";
import {
  FaEye,
  FaFile,
  FaUsers,
  FaPlus,
  FaMinus,
  FaFilter,
} from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import FilterModal from "../Modals/FilterModal";

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
    outstanding: {
      min: 0,
      max: 100000000,
    },
  });
  const handleSearchInput = (e) => {
    setFilters((prev) => ({
      ...prev,
      searchInput: e.target.value,
    }));
  };
  const handleStatusChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };
  const handleOutstandingChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const rangeValue = selectedOption.getAttribute("data-range");
    if (rangeValue) {
      const [start, end] = rangeValue.split("-").map(Number);

      setFilters((prev) => ({
        ...prev,
        outstanding: {
          start: start || 0,
          end: end || Infinity,
        },
      }));
    }
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

      const balance = parseFloat(item.Balance_O_D);

      const matchOutstanding =
        (!filters.outstanding.start && !filters.outstanding.end) ||
        (balance >= filters.outstanding.start &&
          balance <= filters.outstanding.end) ||
        (filters.outstanding.end === Infinity &&
          balance >= filters.outstanding.start);

      return matchesSearch && matchesStatus && matchOutstanding;
    });

    setData(filtered);
  };

  const clearFilter = () => {
    setFilters({
      searchInput: "",
      status: "",
      outstanding: {
        start: "",
        end: "",
      },
    });
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
  return (
    <>
      <div className="container">
        <Header title="Debtor's details" />
        <>
          <div className="d-flex align-items-md-center align-items-start justify-content-between gap-2 mb-4 flex-md-row flex-column">
            <div className="d-flex align-items-center justify-content-start gap-2">
              <input
                type="text"
                placeholder="Search"
                style={{ width: "100%", maxWidth: "200px" }}
                className="input"
                value={filters.searchInput}
                onChange={handleSearchInput}
                disabled={noOfDebtors.length === 0 ? true : false}
              />
              <button
                className="button"
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
              >
                <FaFilter />
              </button>
            </div>
            <div className="d-flex align-items-sm-center align-items-start justify-content-end gap-2 flex-sm-row flex-column">
              <Link to="/newdebtor" className="button bg-gradient">
                Add a new debtor
              </Link>
              <Link to="/newinvoice" className="button">
                Upload invoice
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
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        handleStatusChange={handleStatusChange}
        handleOutstandingChange={handleOutstandingChange}
        searchData={searchData}
        clearFilter={clearFilter}
      />
    </>
  );
};

export default ExistingDebtor;
