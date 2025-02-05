import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LogoutModal = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("tcm_client_token");
    setUser(null);
    navigate("/login", { replace: true });
  };
  return (
    <>
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "300px" }}>
          <div className="modal-content p-2 py-4">
            <h2 className="text-center mb-4">Logout?</h2>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <button
                className="secondary-button"
                onClick={logout}
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                Yes
              </button>
              <button
                className="button"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
