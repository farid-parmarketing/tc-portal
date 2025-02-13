import React from "react";
import { FaTimes } from "react-icons/fa";

const FilterModal = ({ filters, handleFilters, searchData, clearFilter }) => {
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
            {filters && (
              <div className="mb-4">
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilters}
                  className="input"
                >
                  <option value=""></option>
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
              <select name="" className="input">
                <option value=""></option>
                <option value="FOS Visit Required">1 lac to 10 lacs</option>
                <option value="FOS Visit Required">10 lacs to 20 lacs</option>
                <option value="FOS Visit Required">20 lacs to 30 lacs</option>
                <option value="FOS Visit Required">30 lacs to 40 lacs</option>
                <option value="FOS Visit Required">40 lacs to 50 lacs</option>
                <option value="FOS Visit Required">50 lacs to 60 lacs</option>
                <option value="FOS Visit Required">60 lacs to 70 lacs</option>
                <option value="FOS Visit Required">70 lacs to 80 lacs</option>
                <option value="FOS Visit Required">80 lacs to 90 lacs</option>
                <option value="FOS Visit Required">90 lacs to 1 cr</option>
                <option value="FOS Visit Required">1 cr +</option>
              </select>
            </div>
            <div className="mb-4">
              <label>Amount recieved</label>
              <select name="" className="input">
                <option value=""></option>
                <option value="FOS Visit Required">1 lac to 10 lacs</option>
                <option value="FOS Visit Required">10 lacs to 20 lacs</option>
                <option value="FOS Visit Required">20 lacs to 30 lacs</option>
                <option value="FOS Visit Required">30 lacs to 40 lacs</option>
                <option value="FOS Visit Required">40 lacs to 50 lacs</option>
                <option value="FOS Visit Required">50 lacs to 60 lacs</option>
                <option value="FOS Visit Required">60 lacs to 70 lacs</option>
                <option value="FOS Visit Required">70 lacs to 80 lacs</option>
                <option value="FOS Visit Required">80 lacs to 90 lacs</option>
                <option value="FOS Visit Required">90 lacs to 1 cr</option>
                <option value="FOS Visit Required">1 cr +</option>
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
