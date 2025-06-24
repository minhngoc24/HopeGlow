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

  const wrapper = document.createElement("div");
  wrapper.classList.add("preview-wrapper");

  const img = document.createElement("img");
  img.src = imgURL;
  img.classList.add("preview-img");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "×";
  closeBtn.addEventListener("click", () => {
    wrapper.remove();
  });

  wrapper.appendChild(img);
  wrapper.appendChild(closeBtn);
  imagePreview.appendChild(wrapper);

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

  const donateBtn = document.querySelector(".donate-final");

  donateBtn.addEventListener("click", () => {
    const title = document.getElementById("titleInput").value.trim();
    const firstImg = document.querySelector(".preview-img");

    if (!title || !firstImg) {
      alert("Please scan an image and enter a title.");
      return;
    }

    // Get old items or start with empty array
    const oldItems = JSON.parse(localStorage.getItem("donatedItems")) || [];

    // Push new item
    oldItems.unshift({
      image: firstImg.src,
      title: title
    });

    // Save back
    localStorage.setItem("donatedItems", JSON.stringify(oldItems));

    // Redirect to history.html
    window.location.href = "history.html";
});
