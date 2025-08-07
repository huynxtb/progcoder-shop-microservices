import React, { useContext } from 'react'
import VideoModal from '../modal/VideoModal'
import { FarzaaContext } from '../../context/FarzaaContext'

const VideoSection = () => {
  const {handleVideoShow} = useContext(FarzaaContext)
  return (
    <div className="fz-3-video-section">
        <div className="container">
            <h2 className="fz-3-video-section-title">Watch Our Video</h2>
            <button className="js-modal-btn" onClick={handleVideoShow}><i className="fa-solid fa-play"></i></button>
        </div>
        <VideoModal/>
    </div>
  )
}

export default VideoSection