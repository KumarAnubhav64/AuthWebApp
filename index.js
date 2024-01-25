// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSQ5274RI2Oeaii2WX_f_RFY8jXYhzghE",
  authDomain: "auth-6a638.firebaseapp.com",
  projectId: "auth-6a638",
  storageBucket: "auth-6a638.appspot.com",
  messagingSenderId: "312109010429",
  appId: "1:312109010429:web:ea7bca6e80290711255d94",
  measurementId: "G-QTCCPNFDD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);
let NameFeild = document.getElementById("nameFeild");
let title = document.getElementById("title");
signUpBtn.onclick = function (e) {
  NameFeild.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  console.log("Working");
  var email = document.getElementById("mail").value;
  var password = document.getElementById("pass").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("Hello");
      set(ref(database, "users/" + user.uid), {
        email: email,
        password: password,
      })
        .then(() => {
          // Data saved successfully!
          alert("User Created successfully");
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};
signInBtn.onclick = function (e) {
  NameFeild.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  console.log("Working");
  var email = document.getElementById("mail").value;
  var password = document.getElementById("pass").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      var lgDate = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          // Data saved successfully!
          alert("User logged in successfully");
          window.location.replace("./splash.html");
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};
