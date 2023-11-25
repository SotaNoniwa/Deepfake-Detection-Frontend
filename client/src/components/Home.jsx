import React, { useState } from 'react';
import "../Home.css";

const VerificationComponent = () => {
  const [showVideoBox, setShowVideoBox] = useState(false);

  const openCamera = (e) => {
    e.preventDefault();
    setShowVideoBox(true);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        let video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        document.querySelector('.videoBox').appendChild(video);
      })
      .catch(function (error) {
        console.error('Error accessing camera:', error);
      });
  };

  return (
    <div className="mainContainer">
      <div className={`modal ${showVideoBox ? 'hidden' : ''}`}>
        <div className="getVerified">
          <div className="handleBtn">
            <button className="getVerifiedBtn" onClick={openCamera}>
              <h2>Get Verified Yourself</h2>
            </button>
          </div>
          <div className="instruction">
            {/* ... Remaining HTML code ... */}
          </div>
          <div className="note">
            {/* ... Remaining HTML code ... */}
          </div>
        </div>
        <div className={`sayOutLoad ${showVideoBox ? '' : 'hidden'}`}>
          <h2>
            Say Out Loud : <em><b> One, Two, Three</b></em> While Recording
          </h2>
        </div>
        <div className={`loader ${showVideoBox ? '' : 'hidden'}`}>
          {/* ... Remaining HTML code ... */}
        </div>
      </div>
      <div className="overlay"></div>
      <div className="videoBox"></div>
    </div>
  );
};

export default VerificationComponent;
