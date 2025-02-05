import React from "react";

const EditProfileModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="editProfile"
        tabIndex="-1"
        aria-labelledby="editProfileLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header p-2">
              <h2>Edit profile</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-2">
              <form className="edit-profile-form">
                <div className="mb-4">
                  <label>Name</label>
                  <input type="text" className="input" />
                </div>
                <div className="mb-4">
                  <label>Email address</label>
                  <input type="email" className="input" />
                </div>
                <div className="mb-4">
                  <label>Mobile number</label>
                  <input type="number" className="input" />
                </div>
                <div className="mb-4">
                  <label>Profile picture</label>
                  <input type="file" className="input" />
                </div>
                <div className="text-end">
                  <button className="button">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
