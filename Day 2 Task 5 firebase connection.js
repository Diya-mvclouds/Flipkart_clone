import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQdk0DcPXKLcifBJgEyyDgNJsik6yzvCA",
  authDomain: "connect-form1.firebaseapp.com",
  databaseURL: "https://connect-form1-default-rtdb.firebaseio.com",
  projectId: "connect-form1",
  storageBucket: "connect-form1.firebasestorage.app",
  messagingSenderId: "706522614494",
  appId: "1:706522614494:web:4d9a9cbaf0ff73b4cdd04f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.saveData = function(){
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;
  const bio = document.getElementById("bio").value;

  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  const hobbies = [];
  document.querySelectorAll(".hobby:checked").forEach(h => {
    hobbies.push(h.value);
  });

  push(ref(database,"client"),{
    Firstname: fname,
    Lastname: lname,
    email: email,
    password: password,
    age: age,
    bio: bio,
    gender: gender,
    hobbies: hobbies,
  });

  alert("Thank you for creating account, Your Data stored Successfully!");
}