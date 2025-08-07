import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";

const VideoModal = () => {
  const { showVideo, handleVideoClose } = useContext(FarzaaContext);
  return (
    <>
      <div
        className={`overlay ${showVideo ? "open" : ""}`}
        role="button"
        onClick={handleVideoClose}
      ></div>
      <div className={`modal-video ${showVideo ? "open" : ""}`}>
        <div className="video-modal-header">
          <a
            className="video-modal-close-btn"
            role="button"
            onClick={handleVideoClose}
          >
            <i className="fa-regular fa-xmark"></i>
          </a>
        </div>
        <div className="modal-video-body">
          {showVideo && (
            <iframe
              className="video-modal-iframe"
              src="https://www.youtube.com/embed/kRCH8kD1GD0?si=zV0WqHsqqfyqpVUy"
              frameBorder="0"
              tabIndex="-1"
              allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VideoModal;
