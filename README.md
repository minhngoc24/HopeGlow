# HopeGlow

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
