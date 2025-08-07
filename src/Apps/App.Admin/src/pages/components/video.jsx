import React from "react";
import VideoPlayer from "@/components/ui/VideoPlayer";

const VideoPage = () => {
  return (
    <div className="div">
      <VideoPlayer url="https://vjs.zencdn.net/v/oceans.mp4" />
    </div>
  );
};

export default VideoPage;
