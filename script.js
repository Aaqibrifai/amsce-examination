let currentCaptchaStudent = '';
let currentCaptchaInstitution = '';

// Captcha visual obfuscation
function distortText(text) {
  const distortions = ['𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜','𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩'];
  let distorted = '';
  for (let char of text) {
    if (/[A-Z]/.test(char)) {
      distorted += distortions[char.charCodeAt(0) - 65];
    } else {
      distorted += char;
    }
  }
  return distorted;
}

// Generate random captcha
function generateCaptcha(id) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const el = document.getElementById(id);
  el.setAttribute('data-captcha', captcha);
  el.innerText = distortText(captcha);

  if (id === 'captchaStudent') currentCaptchaStudent = captcha;
  if (id === 'captchaInstitution') currentCaptchaInstitution = captcha;
}

// Speak captcha with full forms
function speakCaptcha(id) {
  const el = document.getElementById(id);
  const text = el.getAttribute('data-captcha');
  if (!text || !('speechSynthesis' in window)) {
    alert('Speech synthesis not supported or captcha not found.');
    return;
  }

  const letterMap = {
    A: "A for Apple", B: "B for Ball", C: "C for Cat", D: "D for Dog", E: "E for Elephant",
    F: "F for Fish", G: "G for Goat", H: "H for Hat", I: "I for Ice cream", J: "J for Joker",
    K: "K for Kite", L: "L for Lion", M: "M for Mango", N: "N for Nest", O: "O for Orange",
    P: "P for Parrot", Q: "Q for Queen", R: "R for Rabbit", S: "S for Sun", T: "T for Tiger",
    U: "U for Umbrella", V: "V for Van", W: "W for Watch", X: "X for Xylophone", Y: "Y for Yak", Z: "Z for Zebra"
  };

  let parts = [];

  for (const char of text) {
    if (/[A-Z]/.test(char)) {
      parts.push(letterMap[char.toUpperCase()] || char);
    } else {
      parts.push(char);
    }
  }

  const utterance = new SpeechSynthesisUtterance(parts.join(', '));
  utterance.lang = 'en-US';
  utterance.rate = 0.6; // slower
  utterance.pitch = 1.4; // higher pitch = softer/kid-like
  window.speechSynthesis.speak(utterance);
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  generateCaptcha('captchaStudent');
  generateCaptcha('captchaInstitution');

  document.getElementById("captchaStudent").addEventListener("click", () => {
    generateCaptcha('captchaStudent');
  });

  document.getElementById("captchaInstitution").addEventListener("click", () => {
    generateCaptcha('captchaInstitution');
  });

  document.getElementById("studentLoginBtn").addEventListener("click", () => {
    const regNo = document.querySelectorAll(".login-box")[1].querySelectorAll("input")[0].value;
    const dob = document.querySelectorAll(".login-box")[1].querySelectorAll("input")[1].value;
    const captchaInput = document.querySelectorAll(".login-box")[1].querySelectorAll("input")[2].value;

    if (!regNo || !dob || !captchaInput) {
      alert("Please fill all fields!");
      return;
    }

    if (captchaInput.toUpperCase() === currentCaptchaStudent.toUpperCase()) {
      alert("Login successful!\nWelcome, " + regNo);
    } else {
      alert("Invalid Captcha!");
    }
  });
});

// Optional: scroll pause on hover
const newsList = document.querySelector('.news-list');
const newsContainer = document.getElementById('newsContainer');
if (newsContainer) {
  newsContainer.addEventListener('mouseenter', () => {
    newsList.style.animationPlayState = 'paused';
  });
  newsContainer.addEventListener('mouseleave', () => {
    newsList.style.animationPlayState = 'running';
  });
}
