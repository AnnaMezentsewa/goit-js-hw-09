const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

let timerId = null;
refs.stopBtn.disabled = true;
 

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
    refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
    timerId = setInterval(() => { refs.body.style.backgroundColor = getRandomHexColor();
}, 1000);
}
function onStopClick() {
    clearInterval(timerId);
refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
