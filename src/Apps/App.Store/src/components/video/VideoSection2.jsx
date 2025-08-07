import React, { useContext } from "react";
import BrandSection6 from "../brands/BrandSection6";
import { FarzaaContext } from "../../context/FarzaaContext";
import VideoModal from "../modal/VideoModal";

const VideoSection2 = () => {
  const { handleVideoShow } = useContext(FarzaaContext);
  return (
    <section className="fz-10-video-section">
      <div className="container">
        <div className="row ">
          <div className="col-md-12">
            <div className="fz-10-video-area ">
              <button className="js-modal-btn" onClick={handleVideoShow}>
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <BrandSection6 />
          </div>
        </div>
      </div>
      <VideoModal />
    </section>
  );
};

export default VideoSection2;
