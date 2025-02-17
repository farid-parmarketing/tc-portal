import React from "react";
import { FaTimes } from "react-icons/fa";

const FilterModal = ({
  filters,
  handleStatusChange,
  handleOutstandingChange,
  handleRecievedChange,
  searchData,
  clearFilter,
}) => {
  return (
    <>
      <div
        className="modal fade"
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="mymodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-2">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h1>Filter</h1>
              <div>
                <button
                  className="button"
                  data-bs-toggle="modal"
                  data-bs-target="#filterModal"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            {/*  */}
            {filters.status !== undefined && (
              <div className="mb-4">
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleStatusChange}
                  className="input"
                >
                  <option value="">All</option>
                  <option value="FOS Visit Required">FOS Visit Required</option>
                  <option value="Negotiating">Negotiating</option>
                  <option value="Promised to Pay">Promised to Pay</option>
                  <option value="Company Closed">Company Closed</option>
                  <option value="Phone Number Not Valid">
                    Phone Number Not Valid
                  </option>
                </select>
              </div>
            )}
            <div className="mb-4">
              <label>Outstanding Amount</label>
              <select
                name="outstandingValue"
                className="input"
                onChange={handleOutstandingChange}
              >
                <option value="">Select Outstanding</option>
                <option data-range="100000-1000000">1 lac to 10 lacs</option>
                <option data-range="1000000-2000000">10 lacs to 20 lacs</option>
                <option data-range="2000000-3000000">20 lacs to 30 lacs</option>
                <option data-range="3000000-4000000">30 lacs to 40 lacs</option>
                <option data-range="4000000-5000000">40 lacs to 50 lacs</option>
                <option data-range="5000000-6000000">50 lacs to 60 lacs</option>
                <option data-range="6000000-7000000">60 lacs to 70 lacs</option>
                <option data-range="7000000-8000000">70 lacs to 80 lacs</option>
                <option data-range="8000000-9000000">80 lacs to 90 lacs</option>
                <option data-range="9000000-10000000">90 lacs to 1 cr</option>
                <option data-range="10000000-Infinity">1 cr +</option>
              </select>
            </div>
            <div className="mb-4">
              <label>Amount recieved</label>
              <select
                name="recievedValue"
                className="input"
                onChange={handleRecievedChange}
              >
                <option value="">Select amount recieved</option>
                <option data-range="100000-1000000">1 lac to 10 lacs</option>
                <option data-range="1000000-2000000">10 lacs to 20 lacs</option>
                <option data-range="2000000-3000000">20 lacs to 30 lacs</option>
                <option data-range="3000000-4000000">30 lacs to 40 lacs</option>
                <option data-range="4000000-5000000">40 lacs to 50 lacs</option>
                <option data-range="5000000-6000000">50 lacs to 60 lacs</option>
                <option data-range="6000000-7000000">60 lacs to 70 lacs</option>
                <option data-range="7000000-8000000">70 lacs to 80 lacs</option>
                <option data-range="8000000-9000000">80 lacs to 90 lacs</option>
                <option data-range="9000000-10000000">90 lacs to 1 cr</option>
                <option data-range="10000000-Infinity">1 cr +</option>
              </select>
            </div>

            <div className="d-flex align-items-center justify-content-end gap-2">
              <button
                className="button"
                onClick={clearFilter}
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
              >
                Clear
              </button>
              <button
                className="button"
                onClick={searchData}
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
