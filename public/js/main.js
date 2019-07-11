const buttons = document.querySelectorAll('.timer__button');
const customMinForm = document.querySelector('.custom-min-form');
const customMinInput = customMinForm.querySelector('.custom-min-form__input');
const endTimeEl = document.querySelector('.timer__end-time');
const timerDisplay = document.querySelector('.timer__countdown');

function updateTimerDisplay(secondsLeft) {
  const seconds = secondsLeft % 60;
  const minutes = Math.floor(secondsLeft / 60);
  const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(endTime) {
  const end = new Date(endTime);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTimeEl.textContent = `${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(e) {
  e.preventDefault();

  // dataset.time will be undefined if form is submitted, in which case get value from form input
  const totalSeconds = parseInt((e.target.dataset.time || customMinInput.value), 10) * 60;

  // Only handle input < 1 hour
  if (totalSeconds > 3600) {
    return;
  }

  // If a timer is already running, cancel it
  if (intervalID) {
    clearInterval(intervalID);
  }

  const now = Date.now();
  const then = now + (totalSeconds * 1000);
  updateTimerDisplay(totalSeconds);
  displayEndTime(then);
  const intervalID = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft === 0) {
      clearInterval(intervalID);
    }
    updateTimerDisplay(secondsLeft);
  }, 1000);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

customMinForm.addEventListener('submit', startTimer);
