const sections = document.querySelectorAll(".section");
const header = document.querySelector("header");
const smallEgg = document.getElementById("S-size");
const mediumEgg = document.getElementById("S-size");
const largeEgg = document.getElementById("S-size");
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const addEggButton = document.getElementById("add-egg-button");


function hideAll() {
  for (let section of sections) {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }
  }
}

function showSection(sectionId) {
  const section = document.getElementById(sectionId);

  section.classList.remove("hidden");
}

nextButton.addEventListener("click", function () {
  hideAll("egg-selection-section");
  showSection("header-id")
  showSection("setTimer-id");
});

startButton.addEventListener("click", function () {
  hideAll("setTimer-id");
  showSection("header-id")
  showSection("timer-id");
});
