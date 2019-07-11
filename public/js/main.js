const buttons = document.querySelectorAll('.timer__button');
const customMinForm = document.querySelector('.custom-min-form');
const customMinInput = customMinForm.querySelector('.custom-min-form__input');
const endTimeEl = document.querySelector('.timer__end-time');
const timerDisplay = document.querySelector('.timer__countdown');
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
  const seconds = getSeconds(totalTimeInSeconds);
  const minutes = getMinutes(totalTimeInSeconds);
  const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime() {
  const end = new Date(then);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTimeEl.textContent = `${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function decrementTimer() {
  totalTimeInSeconds = Math.round((then - Date.now()) / 1000);
  if (totalTimeInSeconds === 0) {
    clearInterval(intervalID);
  }
  updateTimerDisplay();
}

function startTimer(e) {
  e.preventDefault();

  // dataset.time will be undefined if form is submitted, in which case get value from form input
  totalTimeInSeconds = parseInt((e.target.dataset.time || customMinInput.value), 10) * 60;

  // Only handle input < 1 hour
  if (totalTimeInSeconds > 3600) {
    return;
  }

  // If a timer is already running, cancel it
  if (intervalID) {
    clearInterval(intervalID);
  }

  now = Date.now();
  then = now + (totalTimeInSeconds * 1000);
  updateTimerDisplay();
  displayEndTime();
  intervalID = setInterval(decrementTimer, 1000);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

customMinForm.addEventListener('submit', startTimer);
