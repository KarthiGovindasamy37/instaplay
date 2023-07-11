import closeIcon from '../Assets/closeIcon.svg'

const Modal = ({  setShowModal, videoKey }) => {
  return (
    <>
        <div className="modal">
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
                src={closeIcon}
                alt=""
                className="close-icon"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
    </>
  );
};

export default Modal;
