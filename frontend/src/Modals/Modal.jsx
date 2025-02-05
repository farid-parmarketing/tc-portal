import React from "react";

const Modal = () => {
  //
  // data-bs-toggle="modal"
  // data-bs-target="#uploadInvoice"
  return (
    <>
      <div
        className="modal fade"
        id="mymodal"
        tabIndex="-1"
        aria-labelledby="mymodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              nulla delectus quod veritatis illum rerum magni eveniet porro nemo
              cupiditate magnam, nostrum enim adipisci iste ducimus voluptatibus
              praesentium aspernatur quas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
