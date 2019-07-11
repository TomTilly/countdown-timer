const buttons = document.querySelectorAll('.timer__button');
const customMinForm = document.querySelector('.custom-min-form');
const customMinInput = customMinForm.querySelector('.custom-min-form__input');
let minText = document.querySelector('.timer__minutes');
let secondsText = document.querySelector('.timer__seconds');
let totalTimeInSeconds;
let intervalID;
let endTime;

function getMinutes(timeInSeconds) {
  return Math.floor(timeInSeconds / 60);
}

function getSeconds(timeInSeconds) {
  return timeInSeconds % 60;
}

function decrementTimer() {
  totalTimeInSeconds -= 1;
  if (totalTimeInSeconds === 0) {
    clearInterval(intervalID);
  }

  const secondsToDisplay = getSeconds(totalTimeInSeconds);
  minText.textContent = getMinutes(totalTimeInSeconds);
  secondsText.textContent = secondsToDisplay > 10 ? secondsToDisplay : `0${secondsToDisplay}`;
  console.log(totalTimeInSeconds);
}

function startTimer(e) {
  e.preventDefault();
  if (intervalID) {
    clearInterval(intervalID);
  }

  // dataset.time will be undefined if form is submitted, so get value from form input
  totalTimeInSeconds = parseInt((e.target.dataset.time || customMinInput.value), 10) * 60;
  if (totalTimeInSeconds > 3600) {
    return;
  }
  intervalID = setInterval(decrementTimer, 1000);

}

buttons.forEach(button => button.addEventListener('click', startTimer));

customMinForm.addEventListener('submit', startTimer);