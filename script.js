"strict";

const btnForOpenCamera = document.querySelector(".getVerifiedBtn");
const getVerifiedBox = document.querySelector(".getVerified");
const modal = document.querySelector(".modal");
const loader = document.querySelector(".loader");
const sayOutLoad = document.querySelector(".sayOutLoad");

const videoBox = document.createElement("div");
modal.appendChild(videoBox);

videoBox.classList.add("videoBox");

function openCamera(e) {
  e.preventDefault();
  getVerifiedBox.classList.add("hidden");
  sayOutLoad.classList.remove("hidden");
  loader.classList.remove("hidden");
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      let video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      videoBox.appendChild(video);
    })
    .catch(function (error) {
      console.error("Error accessing camera:", error);
    });
}

btnForOpenCamera.addEventListener("click", openCamera);
