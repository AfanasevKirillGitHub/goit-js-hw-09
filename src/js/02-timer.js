import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notify.warning('Please choose date');

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDateUser = null;
let milliseconds = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    Notify.success('Good, press start');
    refs.btnStart.disabled = false;
    selectedDateUser = selectedDates[0];
  },
};

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onStartCountdown);

flatpickr(refs.dateTimePicker, options);

function onStartCountdown() {
  intervalId = setInterval(() => {
    if (selectedDateUser <= Date.now()) {
      clearInterval(intervalId);
      return;
    }
    milliseconds = selectedDateUser - Date.now();
    renderCountdown(convertMs(milliseconds));
    refs.btnStart.disabled = true;
  }, 1000);
}

function convertMs(milliseconds) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(milliseconds / day));
  const hours = addLeadingZero(Math.floor((milliseconds % day) / hour));
  const minutes = addLeadingZero(
    Math.floor(((milliseconds % day) % hour) / minute)
  );
  const seconds = addLeadingZero(
    Math.floor((((milliseconds % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderCountdown({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
