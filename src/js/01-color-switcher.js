const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const page = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', onStartBtn);
btnStop.addEventListener('click', onStopBtn);

function onStartBtn() {
  timerId = setInterval(() => {
    page.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onStopBtn() {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
