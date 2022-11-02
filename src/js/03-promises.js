import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const numberFirstDelay = Number(refs.firstDelay.value);
  const numberDelayStep = Number(refs.delayStep.value);
  const numberAmount = Number(refs.amount.value);

  for (let i = 1; i <= numberAmount; i += 1) {
    const nextDelay = numberFirstDelay + numberDelayStep * (i - 1);

    createPromise(i, nextDelay).then(onSucces).catch(onError);
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function onSucces({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
