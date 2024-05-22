import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ url }) {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={url}
        className="react-player"
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default VideoPlayer;
