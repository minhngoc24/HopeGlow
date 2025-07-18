# 🌟HopeGlow 🌟 

## Problem Statement

Many individuals and community organizations — such as low-income families, patients, orphans, or small charities — are in need of everyday support and donated items. At the same time, countless people are willing to give, but lack a convenient and trusted way to connect with those in need.

More importantly, a person may be a **donor** one day and a **recipient** the next — generosity is not one-directional.

---

## Our Solution

**HopeGlow** is a web-based donation platform that allows users to **donate and receive items based on proximity and need**. Whether you're offering support or seeking it, HopeGlow provides a fast, simple, and secure space to connect, share, and uplift your local community.

---
## Project Highlights
- 🔐 Used Firebase Authentication for secure sign-in/sign-up.
- 🖼️ Donors can upload image or scan image of the items. AI will help them to recognize the item when they scan it.
- 🔍 Recipients can search by keyword and see nearby listings.
- 📍 Used Google Maps API for distance-based sorting.
- 🗂️ View pick up address using Google Maps API.

---

## Getting Started
Follow these steps to run the project locally.
### 1. Open a terminal and run: 
```
git clone https://github.com/minhngoc24/hopeglow.git
cd hopeglow
```
### 2. Set up front-end:
```
cd public
cp firebase-config.example.js firebase-config.js
```
Then go to your **Firebase Console → Project Settings → General**, scroll down to **Web App SDK config**, and paste the config into `firebase-config.js`.

### 3. Set up the backend (Firebase Admin SDK)
```
cd hopeglow-backend
cp search.example.json search.json
```
Next, in **Firebase Console → Project Settings → Service Accounts**, click **“Generate new private key”**, and paste the content into `search.json`.

### 4. Install backend dependencies
Make sure you're in the backend folder:
```
pip install -r requirements.txt
```
### 5. Run the backend server
```
cd hopeglow-backend
python search.py
```
### 6. Open the frontend
Open `index.html`file in the root directory and open it in the browser. 

---

## How to use HopeGlow:
### 1. Sign up and Login
- Use email and password to sign up or login.
- If you want to edit your profile, go to **Avatar image → Profile**, then edit your information

### 2. Donate an item
- Go to the "Donate" page
- Choose scan or upload option
- Add title, description, and upload an image of the item.
- Add the pick up location. The map will appear for you to confirm the address here.
- Submit and your item will be visible to others.
- If you want to edit the item, go to **Avatar image → History**, click the item you want to edit.
  
### 3. Search for an item
- Go to the "Seek Help" page
- Enter a keyword (e.g. "shoes", "chair")
- The system will show items sorted by proximity

---
## Demo

[![Watch the demo video](https://img.youtube.com/vi/IkO9sxajr-0/0.jpg)](https://youtu.be/IkO9sxajr-0)

---
## Future Enhancement
- Add openAI API to help donors generate description for the item.
- Let donors and recipients add friend with each other.
- Create ratings

This project is created for hackathon and educational purposes.Feel free to build upon it, improve it, and use it for good.
