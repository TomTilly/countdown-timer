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
  const mins = getMinutes(totalTimeInSeconds);
  const display = `${mins}:${seconds < 10 ? '0' : ''}${seconds}`;
  timerDisplay.textContent = display;
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

  // Only handle input < 1 hour
  if (totalTimeInSeconds > 3600) {
    return;
  }

  // If a timer is already running, cancel it
  if (intervalID) {
    clearInterval(intervalID);
  }

  // dataset.time will be undefined if form is submitted, in which case get value from form input
  totalTimeInSeconds = parseInt((e.target.dataset.time || customMinInput.value), 10) * 60;
  now = Date.now();
  then = now + (totalTimeInSeconds * 1000);
  updateTimerDisplay();
  intervalID = setInterval(decrementTimer, 1000);
  const endTime = new Date(then);
  const endHour = endTime.getHours();
  const endMin = endTime.getMinutes();
  const endTimeDisplay = `${endHour}:${endMin < 10 ? '0' : ''}${endMin}`;
  endTimeEl.textContent = endTimeDisplay;
}

buttons.forEach(button => button.addEventListener('click', startTimer));

customMinForm.addEventListener('submit', startTimer);
