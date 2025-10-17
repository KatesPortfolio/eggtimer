const sections = document.querySelectorAll(".section");
const elements = document.querySelectorAll(".element");
const header = document.querySelector("header");
const smallEggBtn = document.getElementById("small-egg-button");
const mediumEggBtn = document.getElementById("medium-egg-button");
const largeEggBtn = document.getElementById("large-egg-button");
const nextButton = document.getElementById("next-button");
const nextButton2 = document.getElementById("next-button-2");
const backButton2 = document.getElementById("back-button-2");
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
const popup = document.getElementById("popup");
const popupCloseButton = document.getElementById("popup-close-button");
const button1 = document.getElementById("cooking-time-5");
const button2 = document.getElementById("cooking-time-7");
const button3 = document.getElementById("cooking-time-9");
const button4 = document.getElementById("cooking-time-11");
let currentPage;

let selectedEgg = null;
let selectedTime = 0;
let smallEggCount = 0;
let mediumEggCount = 0;
let largeEggCount = 0;

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
    popup.classList.remove("hidden");
    return;
  }

  hideAll();
  hideElement();
  showSection("header-id");
  showSection("setTimer-id");
  currentPage = "setTimer-id";
});

popupCloseButton.addEventListener("click", function () {
  popup.classList.add("hidden");
});

backButton2.addEventListener("click", function () {
  hideAll();
  showSection("egg-selection-section");
  showSection("header-id");
});

nextButton2.addEventListener("click", function () {
  if(!(selectedTime)){
    return;
  }

  hideAll();
  showSection("timer-start");
  showSection("header-id");
});

// backButton.addEventListener("click", function () {
//   hideAll("setTimer-id");
//   showSection("header-id");
//   showSection("egg-selection-section");
//   currentPage = "egg-selection-section";
// });

startButton.addEventListener("click", function () {
  hideAll("setTimer-id");
  showSection("header-id");
  showSection("timer-id");
  currentPage = "timer-id";
});

smallEggBtn.addEventListener("click", function () {
  selectEgg("S");
  add();
});
mediumEggBtn.addEventListener("click", function () {
  selectEgg("M");
  add();
});
largeEggBtn.addEventListener("click", function () {
  selectEgg("L");
  add();
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

function calculateSmallEgg() {
  return smallEggCount * 6;
}

function calculateMediumEgg() {
  return mediumEggCount * 7;
}

function calculateLargeEgg() {
  return largeEggCount * 8.5;
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
  smallEggCount = 0;
  sInput.value = "";
  hideInputField("s-div");
});
mDeleteButton.addEventListener("click", function () {
  mediumEggCount = 0;
  mInput.value = "";
  hideInputField("m-div");
});
lDeleteButton.addEventListener("click", function () {
  largeEggCount = 0;
  lInput.value = "";
  hideInputField("l-div");
});

sInput.addEventListener("input", function () {
  smallEggCount = parseInt(sInput.value) || 0;
  localStorage.setItem("smallEggCount", sInput.value);
  displayUpdateProtein();
});

mInput.addEventListener("input", function () {
  mediumEggCount = parseInt(mInput.value) || 0;
  localStorage.setItem("mediumEggCount", mInput.value);
  displayUpdateProtein();
});

lInput.addEventListener("input", function () {
  largeEggCount = parseInt(lInput.value) || 0;
  localStorage.setItem("largeEggCount", lInput.value);
  displayUpdateProtein();
});

function setTimer(time) {
  selectedTime = time;
}

button1.addEventListener("click", function () {
  setTimer(5);
});
button2.addEventListener("click", function () {
  setTimer(7);
});
button3.addEventListener("click", function () {
  setTimer(9);
});
button4.addEventListener("click", function () {
  setTimer(11);
});

let timerId;

function amountOfProtein() {
  const totalLarge = calculateLargeEgg();
  const totalMedium = calculateMediumEgg();
  const totalSmall = calculateSmallEgg();

  let totalsum = totalSmall + totalMedium + totalLarge;

  return totalsum;
}

function displayUpdateProtein() {
  const total = amountOfProtein();
  proteinAmount.textContent = `${total} g`;
}

startButton.addEventListener("click", function () {

  displayUpdateProtein();

  let ms = 1000;
  let duration = selectedTime * 60;
  timerId = setInterval(function () {
    if (duration <= 0) {
      clearInterval(timerId);
    }
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    timerTime.textContent = `${minutes} : ${seconds}`;
    duration = duration - 1;

    if (duration < 0) {
      hideAll();
      showSection("header-id");
      showSection("price-side");
      setTimeout(function () {
        hideAll()
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
