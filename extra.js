import React, { useState, useRef, useEffect } from "react";

const VideoRecorder = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [timerValue, setTimerValue] = useState(10);
  const [blinkInterval, setBlinkInterval] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    openCamera();
    // Cleanup function for stopping the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);

        const video = videoRef.current;
        if (video) {
          video.srcObject = userStream;
          video.autoplay = true;
          video.muted = true;

          setRecordedChunks([]);
          setIsPaused(true);
          setIsRecording(true);
          setTimerValue(10);

          const newMediaRecorder = new MediaRecorder(userStream, {
            mimeType: "video/webm;codecs=vp9,opus",
          });

          setMediaRecorder(newMediaRecorder);

          newMediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
              setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
            }
          };

          newMediaRecorder.onstop = function () {
            showUploadResetButtons();
          };

          startBlinking();
          startTimer();

          newMediaRecorder.start();
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const startBlinking = () => {
    setBlinkInterval(
      setInterval(() => {
        // Toggle visibility logic here
      }, 1000)
    );
  };

  const stopBlinking = () => {
    clearInterval(blinkInterval);
    // Additional logic for visibility and content
  };

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
        // Additional logic for updating timer display
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    // Additional logic for timer display
  };

  // Inside the showRecordedVideo function
  const showRecordedVideo = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    videoState.style.display = "none";
    videoTimer.style.display = "none";

    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    recordedVideo.src = URL.createObjectURL(recordedBlob);
    recordedVideo.autoplay = false;
    recordedVideo.controls = true;
    videoBox.innerHTML = "";

    videoBox.appendChild(recordedVideo);
    videoBox.appendChild(watchBtn);
    videoBox.appendChild(uploadBtn);
    videoBox.appendChild(resetBtn);
  };

  // Inside the resetRecording function
  const resetRecording = () => {
    setRecordedChunks([]);
    videoBox.innerHTML = "";
    setIsPaused(true);
    setIsRecording(true);
    setTimerValue(10);
    rocerdingStartImg.src = "./images/recordVideo.png";
    takeAPic.src = "./images/recordVideo.png";
    videoTimer.innerHTML = `<h3>${timerValue} sec</h3>`;

    videoState.style.display = "";
    videoTimer.style.display = "";
    openCamera();
  };

  // Inside the uploadRecording function
  const uploadRecording = () => {
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", recordedBlob, "recorded.webm");

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Video uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  };

  // Inside the toggleVideoPlayback function
  const toggleVideoPlayback = () => {
    if (recordedVideo.paused || recordedVideo.ended) {
      recordedVideo.play();

      watchBtn.src = "./images/pause2.png";
    } else {
      recordedVideo.pause();
      watchBtn.src = "./images/resume.png";
    }
  };

  // Inside the showUploadResetButtons function
  const showUploadResetButtons = () => {
    console.log("Recording Finished. Show Upload/Reset Buttons.");

    showRecordedVideo();
  };

  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  //   const [stream, setStream] = useState(null);
  const [capturedFrameDataURL, setCapturedFrameDataURL] = useState(null);

  //   const videoRef = useRef(null);

  const openCameraForPic = () => {
    // Your existing code for opening the camera for pictures
  };

  const showUploadResetButtonsForPic = () => {
    // Your existing code for showing upload and reset buttons after taking a picture
    console.log("Camera opened. Show Upload/Reset Buttons.");

    takeAPic.addEventListener("click", function (e) {
      e.preventDefault();
      if (stream) {
        capturePicture();
        videoBox.appendChild(resetPicBtn);
        videoBox.appendChild(uploadPicBtn);
      } else {
        console.error("Camera not active. Cannot capture picture.");
      }
    });
  };

  const capturePicture = () => {
    // Your existing code for capturing a picture from the camera stream
    const video = document.querySelector("video");

    if (video && video.parentElement) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      capturedFrameDataURL = canvas.toDataURL();

      const image = new Image();
      image.src = capturedFrameDataURL;
      image.classList.add("capturedImage");

      videoBox.innerHTML = "";
      videoBox.appendChild(image);
    } else {
      console.error("Video element not found. Cannot capture picture.");
    }
  };

  const stopCamera = () => {
    // Your existing code for stopping the camera stream
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      stream = null;
    }
  };

  const resetRecordingForPic = () => {
    // Your existing code for resetting the recording process for taking pictures
    videoBox.innerHTML = "";
  };

  const uploadPicture = () => {
    // Your existing code for uploading the captured picture
    if (capturedFrameDataURL) {
      saveToLocal(capturedFrameDataURL, "captured_image.png");

      const blob = dataURLtoBlob(capturedFrameDataURL);
      const formData = new FormData();

      // Create an image element
      const img = document.createElement("img");
      img.src = capturedFrameDataURL;
      img.alt = "Captured Image";

      // Append the image to the lastImage container
      lastImage.innerHTML = "";
      lastImage.appendChild(img);

      formData.append("image", blob, "captured_image.png");
      uloadingStatus();
      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Image uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      console.error("No captured frame available for upload.");
    }
  };

  const dataURLtoBlob = (dataURL) => {
    // Your existing code for converting data URL to a Blob
    const byteString = atob(dataURL.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: "image/png" });
  };

  const saveToLocal = (dataURL, filename) => {
    // Your existing code for saving the data URL as a local file
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    link.click();
  };

  const uploadingStatus = () => {
    // Your existing code for showing the uploading status
    videoBox.innerHTML = "";
    uploadIDCard.classList.add("hidden");
    videoBox.appendChild(loader);

    setTimeout(function () {
      videoBox.removeChild(loader);
      videoBox.appendChild(nextToVideo);
      afterPicture.classList.remove("hidden");
    }, 1000);
  };

  const handleClickOpenCamera = () => {
    stopCamera();
    openCameraForPic();
  };

  const handleClickResetPicture = (e) => {
    e.preventDefault();
    stopCamera();
    resetRecordingForPic();
    openCameraForPic();
  };

  const handleClickUploadPicture = () => {
    uploadPicture();
  };

  const handleClickTakeAPic = (e) => {
    e.preventDefault();
    if (stream) {
      capturePicture();
      videoBox.appendChild(resetPicBtn);
      videoBox.appendChild(uploadPicBtn);
    } else {
      console.error("Camera not active. Cannot capture picture.");
    }
  };

  const handleClickNext = () => {
    openCameraForPic();
  };

  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <div>
      <video ref={videoRef} className="handleVideo" />
      {/* JSX structure for your component */}
    </div>
  );
};

export default VideoRecorder;

// import React, { useState, useRef } from 'react';

// const CameraComponent = () => {

//   return (
//     <div>
//       {/* Your JSX code for the React component */}
//       <button onClick={handleClickOpenCamera}>Open Camera</button>
//       {/* Other JSX elements */}
//     </div>
//   );
// };

// export default CameraComponent;
