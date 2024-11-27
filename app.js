// Typing Animation for Hero Section
const heroTitle = document.querySelector("#hero h1");
const words = ["Benjamin Gallon", "a History Enthusiast", "a Web Developer"];
let wordIndex = 0;
let letterIndex = 0;

function type() {
  // Clear previous content before typing the next word
  if (letterIndex === 0) {
    heroTitle.textContent = ""; // Ensure the content is cleared before typing
  }

  if (letterIndex < words[wordIndex].length) {
    heroTitle.textContent += words[wordIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, 150); // Typing speed
  } else {
    setTimeout(() => {
      erase();
    }, 2000); // Pause before erasing
  }
}

function erase() {
  if (letterIndex > 0) {
    heroTitle.textContent = heroTitle.textContent.slice(0, -1);
    letterIndex--;
    setTimeout(erase, 100); // Erasing speed
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500); // Pause before typing next word
  }
}

document.addEventListener("DOMContentLoaded", type);

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
let isDarkMode = false;

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("footer").classList.toggle("dark-mode");
  isDarkMode = !isDarkMode;

  // Clear existing particles and reload with new settings
  particlesJS.destroy(); // Destroy existing particles
  setTimeout(() => {
    loadParticles(isDarkMode); // Reload particles with updated settings
  }, 100); // 100ms delay
});

// Function to load particles with color based on the mode
function loadParticles(darkMode) {
  const particleColor = darkMode ? "#ffffff" : "#0077b6"; // White for dark mode, blue for light mode
  particlesJS("particle-background", {
    particles: {
      number: {
        value: 80, // Number of particles
        density: {
          enable: true,
          value_area: 800, // Adjust the particle density area
        },
      },
      color: {
        value: particleColor, // Particle color based on mode
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: particleColor,
        opacity: 0.4,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
      },
    },
    interactivity: {
      detect_on: "canvas", // Ensures interactions work on the particle canvas
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true, // Makes particles responsive
      },
    },
    retina_detect: true, // Optimizes for high-resolution screens
  });
}

// Initial load of particles
loadParticles(isDarkMode);

// Parallax Effect for Hero Section
document.addEventListener("scroll", () => {
  const parallaxBg = document.querySelector(".parallax-bg");
  const scrollPosition = window.scrollY;

  if (parallaxBg) {
    // Adjust this value to control the scroll speed (0.5 means slower movement)
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});

// Animate Sections on Scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => observer.observe(section));

// Smooth Scroll for "Hire Me" Button
const hireMeButton = document.querySelector(".cta-button.highlight"); // Select the Hire Me button

if (hireMeButton) {
  hireMeButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    const contactSection = document.querySelector("#contact"); // Target the Contact section
    if (contactSection) {
      // Smooth scroll to Contact section
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}
