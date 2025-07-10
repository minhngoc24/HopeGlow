import{initializeApp}from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { firebaseConfig } from "./public/firebase-config.js";
import {collection, addDoc, Timestamp} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";
import { uploadString } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const imagePreview = document.getElementById("imagePreview");
const scanSection = document.getElementById("scanSection");
const donateSection = document.getElementById("donateSection");
const addMoreBtn = document.getElementById("addMoreBtn");
const titleInput = document.getElementById("titleInput"); // Input for title
const descInput = document.getElementById("descInput"); // Input for description
const pickUpAddr = document.getElementById("pickUpAddr"); // Input for pickup address
// open camera stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing the camera: ", err);
    alert("Could not access the camera. Please check your permissions.");
  });

// Load model AI
let modelPromise = cocoSsd.load(); // Ensure cocoSsd is loaded before using it

snap.addEventListener("click", async() => {
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

  // Run object detection
  const model = await modelPromise;
  const predictions = await model.detect(canvas);
  console.log(predictions);

  // Check if any object is detected
  const hasObject = predictions.length > 0;
  if (hasObject) {
    const best = predictions[0];
    titleInput.value = best.class;
    descInput.value = best.class; // Set title to the first detected object's class
  }else{
    titleInput.value = " No object detected"; 
    descInput.value = "No object detected"; 
  }
  
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
  donateBtn.addEventListener("click", async () => {
    const title = document.getElementById("titleInput").value.trim();
    const description = document.getElementById("descInput").value.trim();
    const firstImg = document.querySelector(".preview-img");
    const pickUpAddress = document.getElementById("pickUpAddr").value.trim();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to donate.");
      return;
    }
    if (!title || !firstImg || !pickUpAddr) {
      alert("Please scan an image and enter a title and pickup address.");
      return;
    }

    try{
      console.log("Uploading image...");
      const storageRef = ref(storage, `donatedItems/${user.uid}/${Date.now()}.png`);
      const snapshot = await uploadString(storageRef, firstImg.src, 'data_url');
      console.log("Image uploaded successfully:", snapshot);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Download URL:", downloadURL);

      await addDoc(collection(db, "donations"), {
        userId: user.uid,
        title: title,
        description: description,
        imageUrl: downloadURL,
        pickUpAddress: pickUpAddress,
        timestamp: Timestamp.now()
      });
  
      alert("Item uploaded successfully!");
      window.location.href = "history.html";
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload. Please try again.");
    }
  });
 

