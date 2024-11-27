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

// Populate Projects
const projects = [
  {
    name: "Crypto Finance Tracker App",
    category: "web",
    description:
      "A Web3-integrated app to track cryptocurrencies and implement AI-driven trading strategies.",
    link: "https://github.com/yourgithub/crypto-tracker",
  },
  {
    name: "Stock Screener",
    category: "python",
    description:
      "Python-based tool for identifying small-cap biotech stocks and undervalued companies.",
    link: "https://github.com/yourgithub/stock-screener",
  },
];

const projectsContainer = document.getElementById("projects-container");
projects.forEach((project) => {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");
  projectDiv.setAttribute("data-category", project.category);
  projectDiv.innerHTML = `
    <h3>${project.name}</h3>
    <p>${project.description}</p>
    <a href="${project.link}" target="_blank">View on GitHub</a>
  `;
  projectsContainer.appendChild(projectDiv);
});

// Filter Projects
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-button")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;
    document.querySelectorAll(".project").forEach((project) => {
      if (category === "all" || project.dataset.category === category) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("footer").classList.toggle("dark-mode");
});
