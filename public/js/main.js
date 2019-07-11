const buttons = document.querySelectorAll('.timer__button');
const customMinForm = document.querySelector('.custom-min-form');
const customMinInput = customMinForm.querySelector('.custom-min-form__input');
const endTimeEl = document.querySelector('.timer__end-time');
const minTextEl = document.querySelector('.timer__minutes');
const secondsTextEl = document.querySelector('.timer__seconds');
let now;
let then;
let totalTimeInSeconds;
let intervalID;

function getMinutes(timeInSeconds) {
  return Math.floor(timeInSeconds / 60);
}

function getSeconds(timeInSeconds) {
  return timeInSeconds % 60;
}

function updateTimerDisplay() {
  const secondsToDisplay = getSeconds(totalTimeInSeconds);
  minTextEl.textContent = getMinutes(totalTimeInSeconds);
  secondsTextEl.textContent = secondsToDisplay > 10 ? secondsToDisplay : `0${secondsToDisplay}`;
}

function decrementTimer() {
  totalTimeInSeconds = Math.round((then - Date.now()) / 1000);
  console.log(totalTimeInSeconds);
  if (totalTimeInSeconds === 0) {
    clearInterval(intervalID);
  }
  updateTimerDisplay();
}

function startTimer(e) {
  e.preventDefault();

  // If a timer is already running, cancel it
  if (intervalID) {
    clearInterval(intervalID);
  }

  // dataset.time will be undefined if form is submitted, in which case get value from form input
  totalTimeInSeconds = parseInt((e.target.dataset.time || customMinInput.value), 10) * 60;

  // Only handle input < 1 hour
  if (totalTimeInSeconds > 3600) {
    return;
  }
  now = Date.now();
  then = now + (totalTimeInSeconds * 1000);
  const endTime = new Date(then);
  updateTimerDisplay();
  endTimeEl.textContent = `${endTime.getHours()}:${endTime.getMinutes()}`;
  intervalID = setInterval(decrementTimer, 1000);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

customMinForm.addEventListener('submit', startTimer);