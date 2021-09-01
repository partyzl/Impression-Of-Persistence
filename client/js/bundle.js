(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const jwt_decode = require("jwt-decode");
const { getAllHabits } = require("./requests");
const API_URL = require("./url");

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginSubmit);

function loginSubmit(event) {
  window.location.assign("dashboard.html");
  event.preventDefault();
}

function registerSubmit(event) {
  event.preventDefault();
  const passwordValue = document.getElementById("registerPasswordInput").value;
  const confirmPasswordValue = document.getElementById(
    "confirmPasswordInput"
  ).value;
  if (confirmPasswordValue === passwordValue && registerForm.checkValidity()) {
    window.location.assign("dashboard.html");
  } else if (confirmPasswordValue != passwordValue) {
    document.getElementById("confirmPasswordInput").setCustomValidity(true);
  }
  registerForm.classList.add("was-validated");
  event.stopPropagation();
}

const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", registerSubmit);

async function requestRegistration(e) {
  e.preventDefault();
  try {
    let formData = new FormData(e.target);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    };
    const r = await fetch(`${API_URL}/auth/register`, options);
    const data = await r.json();
    if (data.err) {
      throw Error(data.err);
    }
    requestLogin(e);
  } catch (err) {
    console.warn(err);
  }
}

async function requestLogin(e) {
  e.preventDefault();

  try {
    let formData = new FormData(e.target);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    };

    const r = await fetch(`${API_URL}/auth/login`, options);
    const data = await r.json();
    if (!data.success) {
      throw new Error("Login not authorised");
    }
    login(data.token);
  } catch (err) {
    console.warn(err);
  }
}

function login(token) {
  const user = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("id", user.id);
  localStorage.setItem("username", user.username);

  const landing = document.getElementById("landing");
  landing.className = "hide-page";
  const habit = document.getElementById("habit-page");
  habit.className = "";
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.querySelector(".header-buttons").style.display = "none";

  getHabits();
}

function logout() {
  localStorage.clear();
  location.reload();
}

function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

module.exports = {
  registerSubmit,
  requestLogin,
  requestRegistration,
  logout,
  currentUser,
  login,
};

},{"./requests":2,"./url":3,"jwt-decode":4}],2:[function(require,module,exports){
// get all habits 
async function getHabits(user) {
    try {
        const response = await fetch(`http://localhost:3000/${user}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// get specific habit 
async function getOneHabit(user, habitId) {
    try {
        const response = await fetch(`http://localhost:3000/${user}/${habitId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// see streak for one habit
async function seeStreaks(user, habitId) {
    try {
        const response = await fetch(`http://localhost:3000/${user}/${habitId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function seeAllStreaks(user) {
    try {
        const response = await fetch(`http://localhost:3000/${user}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// add habit
async function postHabit(e, user) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch(`http://localhost:3000/${user}`, options);
        const newHabit = await response.json();
        return (newHabit);
    } catch (err) {
        console.warn(err);
    }
}

// change habit frequency/ name
async function updateHabit(user, habitId) {
    try {
        // change habit name 
    } catch (err) {
        console.warn(err);
    }
}

// reset tracker for one habit
async function dangerZone(user, habitId) {
    try {
        // reset tracker
    } catch (err) {
        console.warn(err);
    }
}

// delete habit
async function deleteHabit(user, habitId) {
    try {
        const options = {
            method: 'DELETE'
        }
        await fetch(`http://localhost:3000/${user}/${habitId}`, options);
    } catch (err) {
        console.warn(err);
    }
}

module.exports = {
    getHabits,
    getOneHabit,
    seeStreaks,
    seeAllStreaks,
    postHabit,
    updateHabit,
    dangerZone,
    deleteHabit
}
},{}],3:[function(require,module,exports){
module.exports = 'http://localhost:3000'
},{}],4:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1]);