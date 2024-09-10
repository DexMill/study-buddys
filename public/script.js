import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE4CI4GnLxgCxJpO7z5czt2aNg0e1OPu4",
  authDomain: "gt-app-1f609.firebaseapp.com",
  projectId: "gt-app-1f609",
  storageBucket: "gt-app-1f609.appspot.com",
  messagingSenderId: "622751913884",
  appId: "1:622751913884:web:cf55559769bf1b19149a59",
  measurementId: "G-QRKCEMRMDD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const profile = document.getElementById("profile");
const matches = document.getElementById("matches");
const nameInput = document.getElementById("name");
const subjectInput = document.getElementById("subject");
const updateProfileBtn = document.getElementById("updateProfile");
const matchList = document.getElementById("matchList");

// Authentication state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    profile.style.display = "block";
    matches.style.display = "block";
    loadProfile();
    loadMatches();
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    profile.style.display = "none";
    matches.style.display = "none";
  }
});

// Login
loginBtn.addEventListener("click", () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// Update profile
updateProfileBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .set({
        name: nameInput.value,
        subject: subjectInput.value,
      })
      .then(() => {
        alert("Profile updated successfully!");
        loadMatches();
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  }
});

// Load user profile
function loadProfile() {
  const user = auth.currentUser;
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          nameInput.value = data.name || "";
          subjectInput.value = data.subject || "";
        }
      })
      .catch((error) => {
        console.error("Error loading profile: ", error);
      });
  }
}

// Load matches
function loadMatches() {
  const user = auth.currentUser;
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          db.collection("users")
            .where("subject", "==", userData.subject)
            .get()
            .then((querySnapshot) => {
              matchList.innerHTML = "";
              querySnapshot.forEach((doc) => {
                if (doc.id !== user.uid) {
                  const matchData = doc.data();
                  const li = document.createElement("li");
                  li.textContent = `${matchData.name} - ${matchData.subject}`;
                  matchList.appendChild(li);
                }
              });
            })
            .catch((error) => {
              console.error("Error loading matches: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error loading user data: ", error);
      });
  }
}
