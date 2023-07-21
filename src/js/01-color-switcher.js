function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    bodyColor: document.querySelector('body'),
};

let timerId = null;

refs.stop.disabled = true;

const onClickStartChangeColor = () => {
    timerId = setInterval(() => {
        refs.bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
    changeState();
};

const onClickStop = () => {
    clearInterval(timerId);
    changeState();
};

function changeState() {
    if (!refs.start.disabled) {
        refs.start.disabled = true;
        refs.stop.disabled = false;
    } else {
        refs.stop.disabled = true;
        refs.start.disabled = false;
    };
};

refs.start.addEventListener('click', onClickStartChangeColor);
refs.stop.addEventListener('click', onClickStop);