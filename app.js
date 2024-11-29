// Typing Animation for Hero Section
const typedText = document.querySelector("#typed-text");
const words = ["a History Enthusiast", "a Storyteller", "a Web Developer"];
let wordIndex = 0;
let letterIndex = 0;

function type() {
  // Clear previous content before typing the next word
  if (letterIndex === 0) {
    typedText.textContent = ""; // Ensure the content is cleared before typing
  }

  if (letterIndex < words[wordIndex].length) {
    typedText.textContent += words[wordIndex].charAt(letterIndex);
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
    typedText.textContent = typedText.textContent.slice(0, -1);
    letterIndex--;
    setTimeout(erase, 100); // Erasing speed
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500); // Pause before typing next word
  }
}

document.addEventListener("DOMContentLoaded", type);

// Dark Mode Toggle with Icon Rotation
const darkModeToggle = document.getElementById("dark-mode-toggle");
let isDarkMode = false;

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelector("footer").classList.toggle("dark-mode");
    darkModeToggle.classList.toggle("active"); // Toggle active class for rotation
    isDarkMode = !isDarkMode;

    // Remove existing particles instance
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    // Reload particles with updated settings
    loadParticles(isDarkMode);
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

// Animate About Card on Scroll
const aboutCard = document.querySelector(".about-card");
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

aboutObserver.observe(aboutCard);

// Animate Project Cards on Scroll
const projectCards = document.querySelectorAll(".project-card");
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

projectCards.forEach((card) => projectObserver.observe(card));

// Animate Skills Section on Scroll
const skillsSection = document.querySelector(".skills-section");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        console.log("Skills section is visible.");
        skillsObserver.unobserve(entry.target); // Optional: Stop observing after animation
      }
    });
  },
  { threshold: 0.1 }
);

skillsObserver.observe(skillsSection);

// Highlight Active Section Link
const navLinks = document.querySelectorAll("header nav a");

function setActiveLink() {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

  // Add a check to ensure navLinks[index] is defined
  if (navLinks[index]) {
    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
    console.log(`Active link set to: ${navLinks[index].href}`);
  } else {
    console.warn(`No navigation link found for section index: ${index}`);
  }
}

window.addEventListener("scroll", setActiveLink);

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
};

// Modal Functionality
// Get modal and related elements
const modal = document.getElementById("project1-modal");
const closeModalButton = modal.querySelector(".close-button");

// Open modal on "Learn More" button click
document.querySelectorAll(".project-card .cta-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default behavior
    modal.style.display = "block"; // Show modal
  });
});

// Close modal on close button click
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide modal
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"; // Hide modal
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the 3D Globe
  const globeContainer = document.getElementById('skill-globe-container');
  
  if (globeContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      globeContainer.clientWidth / globeContainer.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
    globeContainer.appendChild(renderer.domElement);
    
    // Create the globe
    const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({ 
      map: new THREE.TextureLoader().load('images/earth-texture.jpg') 
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Add skill markers (as glowing spheres)
    const skills = [
      { name: 'Python', lat: 40.7128, lon: -74.0060, description: 'Proficient in Python with 3+ years of experience in scripting, automation, and data analysis.' },
      { name: 'Web Development', lat: 34.0522, lon: -118.2437, description: 'Experienced in building responsive and dynamic websites using modern frameworks and technologies.' },
      // Add more skills as needed
    ];
    
    const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff });
    
    skills.forEach(skill => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      const { x, y, z } = convertLatLonToSphere(skill.lat, skill.lon, 5);
      marker.position.set(x, y, z);
      marker.name = skill.name;
      scene.add(marker);
    });
    
    // Convert latitude and longitude to Cartesian coordinates
    function convertLatLonToSphere(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
    
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
    
      return { x, y, z };
    }
    
    camera.position.z = 15;
    
    // Raycaster for detecting clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
      camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
      camera.updateProjectionMatrix();
    });
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.001; // Rotate the globe slowly
      renderer.render(scene, camera);
    }
    animate();
    
    // Handle marker clicks
    renderer.domElement.addEventListener('click', (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(scene.children);
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const skill = skills.find(s => s.name === clickedObject.name);
        if (skill) {
          showSkillDetails(skill);
        }
      }
    });
  } else {
    console.warn("Element with ID 'skill-globe-container' not found.");
  }
});

// Show skill details in modal
function showSkillDetails(skill) {
  document.getElementById('modal-skill-title').textContent = skill.name;
  document.getElementById('modal-skill-description').textContent = skill.description;
  document.getElementById('skill-details-modal').classList.add('visible');
}

// Close modal functionality
const skillDetailsModal = document.getElementById('skill-details-modal');
const skillCloseModalButton = modal.querySelector('.close-button');

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('visible');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('visible');
  }
});

// Scroll-triggered animation
const animatedSections = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target); // Optional: Stop observing after animation
      }
    });
  },
  { threshold: 0.1 }
);

animatedSections.forEach(section => {
  scrollObserver.observe(section);
});

// Enhance Skill Markers for Glow on Scroll
const skillMarkers = document.querySelectorAll('.skill-marker');

const markerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        markerObserver.unobserve(entry.target); // Optional: Stop observing after animation
      }
    });
  },
  { threshold: 0.5 }
);

skillMarkers.forEach(marker => {
  markerObserver.observe(marker);
});

// Handle Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 3000); // Hide after 3 seconds
});

// Animate Skill Rings When They Come Into View
const skillRings = document.querySelectorAll('.skill-ring');

const animateRings = () => {
  skillRings.forEach((ring) => {
    const skillValue = ring.dataset.skill; // Get percentage from data-skill
    const style = `conic-gradient(#00aaff ${skillValue * 3.6}deg, #333 ${skillValue * 3.6}deg)`;
    ring.style.background = style;
  });
};

const ringsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateRings();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillRings.forEach(ring => ringsObserver.observe(ring));
