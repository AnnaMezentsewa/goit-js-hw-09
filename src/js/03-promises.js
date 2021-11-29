import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget;

  let currentDelay = Number(delay.value);
  const steps = Number(step.value);
  const promisesQuantity = Number(amount.value);

  for (let i = 1; i <= promisesQuantity; i+= 1) {
    createPromise(i, currentDelay).then(onResolved).catch(onRejected);
    currentDelay += steps;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(` Fulfilled promise ${position} in ${delay}ms`);
      }

      reject(` Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

function onResolved(result) {
  Notify.success(result);
}

function onRejected(error) {
  Notify.failure(error);
}
