const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const imagePreview = document.getElementById("imagePreview");
const scanSection = document.getElementById("scanSection");
const donateSection = document.getElementById("donateSection");
const addMoreBtn = document.getElementById("addMoreBtn");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  });

snap.addEventListener("click", () => {
  // Capture snapshot
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  const imgURL = canvas.toDataURL("image/png");

  // Add to preview
  const img = document.createElement("img");
  img.src = imgURL;
  img.classList.add("preview-img");
  imagePreview.appendChild(img);

  // Hide scan, show donate
  scanSection.style.display = "none";
  donateSection.style.display = "flex";
});

addMoreBtn.addEventListener("click", () => {
  // Show scan again to take more pictures
  scanSection.style.display = "flex";
  donateSection.style.display = "none";
});


 // Script for avatar dropdown
 const profileIcon = document.getElementById("profileIcon");
 const dropdownMenu = document.getElementById("dropdownMenu");

 profileIcon.addEventListener("click", function () {
   dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
 });

 document.addEventListener("click", function (event) {
   if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
     dropdownMenu.style.display = "none";
   }
 });