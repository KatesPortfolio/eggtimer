const sections = document.querySelectorAll(".section");
const elements = document.querySelectorAll(".element");
const header = document.querySelector("header");
const smallEggBtn = document.getElementById("small-egg-button");
const mediumEggBtn = document.getElementById("medium-egg-button");
const largeEggBtn = document.getElementById("large-egg-button");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
const startButton = document.getElementById("start-button");
const addEggButton = document.getElementById("add-egg-button");
const cancelButton = document.getElementById("cancel-button");
const deleteButton = document.querySelectorAll(".delete-button");
const eggContainer = document.querySelectorAll(".egg-selection-container");
const sInput = document.getElementById("input-number-s");
const mInput = document.getElementById("input-number-m");
const lInput = document.getElementById("input-number-l");
const sDeleteButton = document.getElementById("s-delete");
const mDeleteButton = document.getElementById("m-delete");
const lDeleteButton = document.getElementById("l-delete");
const timerTime = document.getElementById("timer-time");
const timerInput = document.getElementById("timer-input");
const proteinAmount = document.getElementById("protein-amount");
const infoButton = document.getElementById("information-icon");
const informationS = document.getElementById("information-section");
let currentPage;

let selectedEgg = null;
let smallEggCount = 0; // Namnbyte här
let mediumEggCount = 0; // Namnbyte här
let largeEggCount = 0; // Namnbyte här

window.addEventListener("load", function () {
  hideAll();

  showSection("welcome-splash");
  setTimeout(() => {
    hideAll();
    showSection("egg-selection-section");
    currentPage = "egg-selection-section";
    showSection("header-id");
    hideElement();
  }, 1500);
});

function hideAll() {
  for (let section of sections) {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }
  }
}

function hideInputField(id) {
  const element = document.getElementById(id);
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

function hideElement() {
  for (let element of elements) {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }
}

function showSection(sectionId) {
  const section = document.getElementById(sectionId);

  section.classList.remove("hidden");
}

function showElement(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove("hidden");
}

nextButton.addEventListener("click", function () {
  if (!(smallEggCount || mediumEggCount || largeEggCount)) {
    // Namnbyte här
    return;
  }

  hideAll();
  showSection("header-id");
  showSection("setTimer-id");
  currentPage = "setTimer-id";
});

backButton.addEventListener("click", function () {
  hideAll("setTimer-id");
  showSection("header-id");
  showSection("egg-selection-section");
  currentPage = "egg-selection-section";
});

startButton.addEventListener("click", function () {
  hideAll("setTimer-id");
  showSection("header-id");
  showSection("timer-id");
  currentPage = "timer-id";
});

smallEggBtn.addEventListener("click", function () {
  selectEgg("S");
});
mediumEggBtn.addEventListener("click", function () {
  selectEgg("M");
});
largeEggBtn.addEventListener("click", function () {
  selectEgg("L");
});

function selectEgg(size) {
  selectedEgg = size;

  if (size === "S") {
    smallEggBtn.classList.add("egg-selected");
  }
  if (size === "M") {
    mediumEggBtn.classList.add("egg-selected");
  }
  if (size === "L") {
    largeEggBtn.classList.add("egg-selected");
  }
}

function add() {
  if (selectedEgg === "S") {
    document.getElementById("s-div").classList.remove("hidden");
    showElement("s-div");
  }
  if (selectedEgg === "M") {
    document.getElementById("m-div").classList.remove("hidden");
    showElement("m-div");
  }
  if (selectedEgg === "L") {
    document.getElementById("l-div").classList.remove("hidden");
    showElement("l-div");
  }
}

smallEggBtn.addEventListener("click", add);
mediumEggBtn.addEventListener("click", add);
largeEggBtn.addEventListener("click", add);

function calculateSmallEgg() {
  return smallEggCount * 6; // Namnbyte här
}

function calculateMediumEgg() {
  return mediumEggCount * 7; // Namnbyte här
}

function calculateLargeEgg() {
  return largeEggCount * 8.5; // Namnbyte här
}

function clearInput(eggName) {
  localStorage.removeItem("s-div");
  localStorage.removeItem("m-div");
  localStorage.removeItem("l-div");

  hideElement("s-div");
  hideElement("m-div");
  hideElement("l-div");
}

sDeleteButton.addEventListener("click", function () {
  smallEggCount = 0; // Namnbyte här
  sInput.value = "";
  hideInputField("s-div");
});
mDeleteButton.addEventListener("click", function () {
  mediumEggCount = 0; // Namnbyte här
  mInput.value = "";
  hideInputField("m-div");
});
lDeleteButton.addEventListener("click", function () {
  largeEggCount = 0; // Namnbyte här
  lInput.value = "";
  hideInputField("l-div");
});

sInput.addEventListener("input", function () {
  smallEggCount = parseInt(sInput.value); // Namnbyte här
  localStorage.setItem("smallEggCount", sInput.value); // Namnbyte här
  console.log(smallEggCount); // Namnbyte här
});

mInput.addEventListener("input", function () {
  mediumEggCount = parseInt(mInput.value); // Namnbyte här
  localStorage.setItem("mediumEggCount", mInput.value); // Namnbyte här
});

lInput.addEventListener("input", function () {
  largeEggCount = parseInt(lInput.value); // Namnbyte här
  localStorage.setItem("largeEggCount", lInput.value); // Namnbyte här
});

let timerId;

startButton.addEventListener("click", function () {
  const totalLarge = calculateLargeEgg();
  const totalMedium = calculateMediumEgg();
  const totalSmall = calculateSmallEgg();

  let totalsum = totalSmall + totalMedium + totalLarge;

  proteinAmount.textContent = `${totalsum} g`;

  let ms = 1000;
  let duration = Number(timerInput.value) * 60;
  timerId = setInterval(function () {
    if (duration <= 0) {
      clearInterval(timerId);
    }
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    timerTime.textContent = `${minutes} : ${seconds}`;
    duration = duration - 1;

    duration = -1;
    if (duration < 0) {
      hideAll();
      showSection("price-side");
      setTimeout(function () {
        showSection("header-id");
        showSection("finished-section");
        currentPage = "finished-section";
      }, 1000);
      return;
    }
  }, ms);
});

cancelButton.addEventListener("click", function () {
  clearInterval(timerId);
  hideAll();
  showSection("header-id");
  showSection("setTimer-id");
});

infoButton.addEventListener("click", function () {
  hideAll();
  showSection("information-section");
  showSection("header-id");
});

informationS.addEventListener("click", function () {
  hideAll();
  showSection("header-id");
  showSection(currentPage);
});
