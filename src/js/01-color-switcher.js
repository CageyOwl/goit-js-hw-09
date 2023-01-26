function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function buttonsToggler(buttonsStruct) {
  for (let btn in buttonsStruct) {
    buttonsStruct[btn].toggleAttribute('disabled');
  }
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
refs.stopBtn.toggleAttribute('disabled');

let colorChangerId;

refs.startBtn.addEventListener('click', () => {
  buttonsToggler(refs);
  colorChangerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  buttonsToggler(refs);
  clearInterval(colorChangerId);
});
