const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err) {
    console.error("Error accessing camera: " + err);
  });

// Chụp ảnh
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");

snap.addEventListener("click", () => {
  canvas.style.display = "block";
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
});