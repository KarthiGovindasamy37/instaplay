import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Modal = ({ showModal, setShowModal, videoKey }) => {
  return (
    <>
      {showModal ? (
        <div style={{ color: "white" }} className="modal">
          <div className="modal-view-div">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}`}
              className="iframe"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <div className="close">
              <img
                src="/assets/closeIcon.svg"
                alt=""
                className="close-icon"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
