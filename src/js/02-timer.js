import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Global variable
let pickedDate = null;
let timerId = null;

// Adding referenses
const refs = {
  startBtn: document.querySelector('button[data-start]'),
 
  datePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

// Disabling the Start button initially
refs.startBtn.disabled = true;

// Adding EventListeners
refs.startBtn.addEventListener('click', onStartBtnClick);


// Options settings for flatpickr date-selector
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0];
    if (pickedDate > Date.now()) {
      refs.startBtn.disabled = false;
     
    } else {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
     
    }
  },
};

flatpickr('#datetime-picker', options);

// Event handlers
function onStartBtnClick() {
  timerId = setInterval(() => {
    if (pickedDate <= Date.now()) return;
    const currentTime = convertMs(pickedDate - Date.now());

    refs.seconds.textContent = insertLeadingZero(currentTime.seconds);
    refs.minutes.textContent = insertLeadingZero(currentTime.minutes);
    refs.hours.textContent = insertLeadingZero(currentTime.hours);
    refs.days.textContent = insertLeadingZero(currentTime.days);
  }, 1000);
}

// Functions helpers
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function insertLeadingZero(value) {
  return value.toString().padStart(2, '0');
}