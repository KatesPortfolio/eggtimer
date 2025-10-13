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
