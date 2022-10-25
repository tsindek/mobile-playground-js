const accelPermsButton = document.querySelector("#accelPermsButton");
accelPermsButton.addEventListener("click", getAccelerationPermission);
let latestEvent = null;
let events = [];
const accDisplay = document.querySelector(".displayAcc");

function getAccelerationPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          window.addEventListener("devicemotion", handleOrientation);
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("devicemotion", handleOrientation);
  }
}

function handleOrientation(event) {
  const y = event.acceleration.y;
  latestEvent = y;
}

const touchField = document.querySelector(".touchField");
touchField.addEventListener("touchstart", touchStart);
touchField.addEventListener("touchend", touchEnd);

let touchIntervall = null;

function touchStart() {
  if (touchIntervall === null && counterIntervall === null) {
    touchIntervall = setInterval(whileTouchActive, 50);
  }
}

function touchEnd() {
  if (touchIntervall !== null) {
    clearInterval(touchIntervall);
    touchIntervall = null;
    console.table(events);
  }
}

let squatCounter = 0;

accDisplay.textContent = squatCounter;

function whileTouchActive() {
  events.push(latestEvent.toFixed(2));
  isSquat(latestEvent);
}

let phaseOne = false;
let phaseTwo = false;
let phaseThree = false;
let phaseFour = false;

function isSquat(value) {
  if (value < 1) {
    phaseOne = true;
    //   console.log("phase one" + value);
  }
  if (phaseOne === true && value > 2) {
    phaseTwo = true;
    //   console.log("phase two" + value);
  }
  if (phaseOne === true && phaseTwo === true && value < 0) {
    phaseThree = true;
    //   console.log("phase three" + value);
  }
  if (
    phaseOne === true &&
    phaseTwo === true &&
    phaseThree === true &&
    value > 2
  ) {
    phaseFour = true;
    console.log("phase four" + value);
  }
  if (
    phaseOne === true &&
    phaseTwo === true &&
    phaseThree === true &&
    phaseFour === true
  ) {
    //events = [];
    phaseOne = false;
    phaseTwo = false;
    phaseThree = false;
    phaseFour = false;
    squatCounter++;
  }
  accDisplay.textContent = squatCounter;
}