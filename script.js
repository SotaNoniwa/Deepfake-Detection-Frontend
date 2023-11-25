"use strict";

const btnForOpenCamera = document.querySelector(".getVerifiedBtn");
const getVerifiedBox = document.querySelector(".getVerified");
const modal = document.querySelector(".modal");
const loader = document.querySelector(".loader");
const sayOutLoad = document.querySelector(".sayOutLoad");
const afterPicture = document.querySelector(".afterPicture");
const next = document.querySelector(".nextToVideo");

const videoBox = document.createElement("div");
const videoTimer = document.createElement("div");
const videoState = document.createElement("div");
const nextToVideo = document.createElement("div");

const rocerdingStartImg = document.createElement("img");
const rocerdPauseImg = document.createElement("img");
const rocerdResumeImg = document.createElement("img");

let isPaused = true;
let isRecording = true;

let timerValue = 10; // Initial timer value in seconds
let blinkInterval;
let timerInterval;

let recordedChunks = []; // Array to store recorded video chunks
let mediaRecorder; // MediaRecorder object
let stream; // Store the stream globally

nextToVideo.classList.add("handleBtn");

videoTimer.innerHTML = `<h3>${timerValue} sec</h3>`;
videoTimer.classList.add("videoTimer");

videoState.innerHTML = "<h3> Record </h3>";
videoState.classList.add("videoState");

rocerdingStartImg.classList.add("recordToggleBtn");
rocerdingStartImg.src = "./images/recordVideo.png";
rocerdingStartImg.setAttribute("alt", "No Image");

rocerdPauseImg.classList.add("pauseAndResume");
rocerdPauseImg.src = "./images/pause2.png";
rocerdPauseImg.setAttribute("alt", "No Image");

modal.appendChild(videoBox);

videoBox.classList.add("videoBox");

function openCamera(e) {
  e.preventDefault();
  afterPicture.classList.add("hidden");
  getVerifiedBox.classList.add("hidden");
  sayOutLoad.classList.remove("hidden");
  loader.classList.remove("hidden");

  // Open the user's device camera without streaming
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(function (userStream) {
      stream = userStream; // Store the stream globally
      let video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;

      videoBox.innerHTML = ""; // note
      video.classList.add("handleVideo");
      videoBox.appendChild(video);
      videoBox.appendChild(rocerdingStartImg);
      videoBox.appendChild(videoTimer);

      // Initialize MediaRecorder
      //   mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9,opus",
      });

      // Add event listeners for data available and stop events
      mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = function () {
        showUploadResetButtons();
      };
    })
    .catch(function (error) {
      console.error("Error accessing camera:", error);
    });
}

// btnForOpenCamera.addEventListener("click", openCamera);

rocerdingStartImg.addEventListener("click", function (e) {
  e.preventDefault();
  videoBox.appendChild(videoState);

  if (isRecording) {
    rocerdingStartImg.src = "./images/record.png";
    isRecording = false;

    // Start the MediaRecorder
    try {
      mediaRecorder.start();
      startBlinking();
      startTimer();
    } catch (error) {
      console.error("Error starting MediaRecorder:", error);
    }

    return;
  }

  // Stop the MediaRecorder
  rocerdingStartImg.src = "./images/record.png";
  isRecording = true;
  stopBlinking();
  stopTimer();
  mediaRecorder.stop();
});

rocerdPauseImg.addEventListener("click", function (e) {
  e.preventDefault();
  if (!isPaused) {
    rocerdPauseImg.src = "./images/pause2.png";
    isPaused = true;
    startBlinking();
    startTimer();
    return;
  }

  rocerdPauseImg.src = "./images/resume.png";
  isPaused = false;
  stopBlinking();
});

function startBlinking() {
  blinkInterval = setInterval(function () {
    videoState.style.visibility =
      videoState.style.visibility === "hidden" ? "visible" : "hidden";
  }, 1000);
}

function stopBlinking() {
  clearInterval(blinkInterval);
  videoState.style.visibility = "visible"; // Ensure it's visible after stopping blinking
  videoState.innerHTML = "<h3> Pause </h3>";
  stopTimer();
}

function startTimer() {
  timerInterval = setInterval(function () {
    timerValue--;
    if (timerValue >= 0) {
      videoTimer.innerHTML = `<h3>${timerValue} sec</h3>`;
    } else {
      stopBlinking();
      rocerdingStartImg.src = "./images/recordVideo.png";

      // Upload option or re-recording
      showUploadResetButtons();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

const recordedVideo = document.createElement("video");
recordedVideo.classList.add("recordedVideo");

const uploadPicBtn = document.createElement("button");
const resetPicBtn = document.createElement("button");

const uploadBtn = document.createElement("button");
const resetBtn = document.createElement("button");
const watchBtn = document.createElement("img");

uploadBtn.classList.add("uploadBtn");
resetBtn.classList.add("resetBtn");

uploadPicBtn.classList.add("uploadBtn");
resetPicBtn.classList.add("resetBtn");

let resetIcon = `<div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

<div class="text">Upload</div>`;

uploadBtn.innerHTML = resetIcon;
uploadPicBtn.innerHTML = resetIcon;

let uploadIcon = `<div class="sign"><svg fill="#000000" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"></path></g></svg>
<div class="text">Reset</div>`;
resetBtn.innerHTML = uploadIcon;
resetPicBtn.innerHTML = uploadIcon;
// watchBtn.src = "./images/resume.png";
// watchBtn.setAttribute("alt", "No Image");

watchBtn.classList.add("watchPauseAndResume");
watchBtn.src = "./images/resume.png";
watchBtn.setAttribute("alt", "No Image");

// Listen for the "ended" event on the recordedVideo
recordedVideo.addEventListener("ended", function () {
  recordedVideo.pause();
  watchBtn.src = "./images/resume.png";
});

// Listen for the "pause" event on the recordedVideo
recordedVideo.addEventListener("pause", function () {
  watchBtn.src = "./images/resume.png";
});

function toggleVideoPlayback() {
  if (recordedVideo.paused || recordedVideo.ended) {
    recordedVideo.play();

    watchBtn.src = "./images/pause2.png";
  } else {
    recordedVideo.pause();
    watchBtn.src = "./images/resume.png";
  }
}

// Event listener for watchBtn click
watchBtn.addEventListener("click", toggleVideoPlayback);

function showRecordedVideo() {
  // Stop the streaming video
  const streamingVideo = document.querySelector(".handleVideo");
  if (streamingVideo) {
    const tracks = streamingVideo.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }

  // Hide the videoState and timer
  videoState.style.display = "none";
  videoTimer.style.display = "none";

  // Show the recorded video
  const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  recordedVideo.src = URL.createObjectURL(recordedBlob);
  recordedVideo.autoplay = false;
  recordedVideo.controls = true;
  videoBox.innerHTML = "";

  videoBox.appendChild(recordedVideo);
  videoBox.appendChild(watchBtn);
  videoBox.appendChild(uploadBtn);
  videoBox.appendChild(resetBtn);
}

function showUploadResetButtons() {
  // Implement logic to show upload/reset buttons or handle the end of recording
  console.log("Recording Finished. Show Upload/Reset Buttons.");

  // For demonstration purposes, show the recorded video at the end
  showRecordedVideo();
}

function resetRecording(e) {
  recordedChunks = [];
  videoBox.innerHTML = "";
  isPaused = true;
  isRecording = true;

  timerInterval = "";
  mediaRecorder = "";
  stream = "";

  timerValue = 10; // Initial timer value in seconds
  rocerdingStartImg.src = "./images/recordVideo.png";
  takeAPic.src = "./images/recordVideo.png";
  videoTimer.innerHTML = `<h3>${timerValue} sec</h3>`;

  // Hide the videoState and timer
  videoState.style.display = "";
  videoTimer.style.display = "";
  openCamera(e);
}

function uploadRecording() {
  const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  // Create a FormData object to send the blob to the server
  const formData = new FormData();
  formData.append("video", recordedBlob, "recorded.webm");

  // Send the blob to the server
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
}

// Event listener for resetBtn click
resetBtn.addEventListener("click", resetRecording);

// Event listener for uploadBtn click
uploadBtn.addEventListener("click", uploadRecording);

//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
//########################################################
const takeAPic = document.createElement("img");
const uploadIDCard = document.querySelector(".upload-IDCard");

takeAPic.classList.add("recordToggleBtn");
takeAPic.src = "./images/takingPic.png";
takeAPic.setAttribute("alt", "No Image");

function openCameraForPic() {
  getVerifiedBox.classList.add("hidden");
  loader.classList.remove("hidden");
  uploadIDCard.classList.remove("hidden");

  // Open the user's device camera without streaming
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) // Disable audio for picture
    .then(function (userStream) {
      stream = userStream; // Store the stream globally

      // Create video element
      let video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;

      // Append the video to the container
      videoBox.innerHTML = "";
      videoBox.appendChild(video);
      videoBox.appendChild(takeAPic);

      // Log to check if the video element is present in the DOM
      console.log("Video element:", video);
      console.log("Video parent element:", video.parentElement);

      // Show the upload/reset buttons or other UI elements
      showUploadResetButtonsForPic();
    })
    .catch(function (error) {
      console.error("Error accessing camera:", error);
    });
}

let capturedFrameDataURL;
function showUploadResetButtonsForPic() {
  // Implement logic to show upload/reset buttons or handle the end of capturing a picture
  console.log("Camera opened. Show Upload/Reset Buttons.");

  // For demonstration purposes, you can show any relevant UI elements here

  // Add click event listener to takeAPic after opening the camera
  takeAPic.addEventListener("click", function (e) {
    e.preventDefault();
    // Capture the picture after the user clicks the button
    if (stream) {
      // Check if the camera is still active
      capturePicture();
      videoBox.appendChild(resetPicBtn);
      videoBox.appendChild(uploadPicBtn);
    } else {
      console.error("Camera not active. Cannot capture picture.");
    }
  });
}

function capturePicture() {
  // Capture a frame from the video stream and display it as an image
  const video = document.querySelector("video");

  // Check if the video element is present in the DOM
  if (video && video.parentElement) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL and store it
    capturedFrameDataURL = canvas.toDataURL();

    // Display the captured image
    const image = new Image();
    image.src = capturedFrameDataURL;
    image.classList.add("capturedImage");

    videoBox.innerHTML = "";
    videoBox.appendChild(image);
    // You can save the image data or perform other actions here
  } else {
    console.error("Video element not found. Cannot capture picture.");
  }
}

// Event listener for resetBtn click
resetPicBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Stop the camera before resetting
  stopCamera();
  recordedChunks = [];
  resetRecordingForPic();
  openCameraForPic();
});

function stopCamera() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    stream = null;
  }
}

// Add click event listener to btnForOpenCamera to open the camera
btnForOpenCamera.addEventListener("click", function (e) {
  e.preventDefault();
  // Stop the camera before opening a new one
  stopCamera();
  openCameraForPic();
});

function resetRecordingForPic() {
  // Clear the videoBox
  videoBox.innerHTML = "";
}

// function uploadPicture() {
//   const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
//   // Create a FormData object to send the blob to the server
//   const formData = new FormData();
//   formData.append("video", recordedBlob, "recorded.webm");

//   // Send the blob to the server
//   fetch("/upload", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Video uploaded successfully:", data);
//     })
//     .catch((error) => {
//       console.error("Error uploading video:", error);
//     });
// }
function uploadPicture() {
  // Check if a frame has been captured
  if (capturedFrameDataURL) {
    // Save the captured image locally
    saveToLocal(capturedFrameDataURL, "captured_image.png");

    // Create a Blob from the data URL
    const blob = dataURLtoBlob(capturedFrameDataURL);

    // Create a FormData object to send the blob to the server
    const formData = new FormData();
    formData.append("image", blob, "captured_image.png");
    uloadingStatus();
    // Send the blob to the server
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
}

// Helper function to convert data URL to Blob
function dataURLtoBlob(dataURL) {
  const byteString = atob(dataURL.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: "image/png" });
}

// Helper function to save data URL locally
function saveToLocal(dataURL, filename) {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;
  link.click();
}

function uloadingStatus() {
  videoBox.innerHTML = "";
  uploadIDCard.classList.add("hidden");
  videoBox.appendChild(loader);

  setTimeout(function () {
    videoBox.removeChild(loader);
    videoBox.appendChild(nextToVideo);
    afterPicture.classList.remove("hidden");
  }, 1000);
}

// Event listener for uploadBtn click
uploadPicBtn.addEventListener("click", uploadPicture);

next.addEventListener("click", openCamera);
