import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });
};

const form = document.querySelector('.form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const { delay, step, amount } = e.target.elements;

    const formData = {
      delay: Number(delay.value),
      step: Number(step.value),
      amount: Number(amount.value),
    };

  for (let i = 0; i < formData.amount; i += 1) {
    const delayValue = formData.delay + i * formData.step;

    createPromise(i + 1, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});