/* ========================= */
/* DARK / LIGHT MODE */
/* ========================= */

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});


/* ========================= */
/* HAMBURGER MENU */
/* ========================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("show");
});

// Auto close menu when clicking link
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active");
  });
});


/* ========================= */
/* TYPING ANIMATION */
/* ========================= */

const words = [
  "Frontend Developer",
  "Data Analyst",
  "JavaScript Enthusiast",
  "Data Visualization Specialist"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const typingElement = document.getElementById("typing");

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex++);
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex--);
  }

  if (charIndex === currentWord.length) {
    setTimeout(() => isDeleting = true, 1000);
  }

  if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();


/* ========================= */
/* RESUME MODAL */
/* ========================= */

function openResume() {
  document.getElementById("resumeModal").style.display = "flex";
}

function closeResume() {
  document.getElementById("resumeModal").style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", function (e) {
  const modal = document.getElementById("resumeModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


/* ========================= */
/* SKILL BARS ANIMATION */
/* ========================= */

const bars = document.querySelectorAll(".progress-bar");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.progress;
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => skillObserver.observe(bar));


/* ========================= */
/* SECTION FADE-IN ANIMATION */
/* ========================= */

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => sectionObserver.observe(section));


/* ========================= */
/* EMAILJS CONTACT FORM */
/* ========================= */

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = "Sending...";

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  })
    .then(function () {
      statusMessage.textContent = "✅ Message Sent Successfully!";
      statusMessage.style.color = "lightgreen";
    })
    .catch(function () {
      statusMessage.textContent = "❌ Failed to send message.";
      statusMessage.style.color = "red";
    });

  document.getElementById("contactForm").reset();
});
