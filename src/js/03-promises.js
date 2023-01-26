import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');
const settingsSelectors = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

form.addEventListener('submit', event => {
  event.preventDefault();
  createPromises(
    settingsSelectors.amount.valueAsNumber,
    settingsSelectors.delay.valueAsNumber,
    settingsSelectors.step.valueAsNumber
  );
  form.reset();
});

// A cycle for promises creation. Asynchronous code and promises are contained by the "createPromise" function
function createPromises(amount, delay, step) {
  for (let i = 0; i < amount; delay += step, ++i) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
