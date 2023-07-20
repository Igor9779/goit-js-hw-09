import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerId = null;

refs = {
    input: document.querySelector('#datetime-picker'),
    button: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.button.disabled = true;

refs.input.addEventListener('click', () => {
    dateTimeWidget;
});
refs.button.addEventListener('click',onClickBtnStart);

function onClickBtnStart() {
    const selectDate = new Date(refs.input.value).getTime();
    const currentDate = Date.now();
    const timer = selectDate - currentDate;

    startTimer(timer);
};

function startTimer(duration) {
    timerId = setInterval(() => {
        const time = convertMs(duration);
        refs.days.textContent = addLeadingZero(time.days);
        refs.hours.textContent = addLeadingZero(time.hours);
        refs.minutes.textContent = addLeadingZero(time.minutes);
        refs.seconds.textContent = addLeadingZero(time.seconds);

        if (duration <= 0) {
            clearInterval(timerId);
        };

        duration -= 1000;
    }, 1000);
};

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
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

const dateTimeWidget = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            Notify.failure('Please choose a date in the future');
            refs.button.disabled = true;
        } else {
            refs.button.disabled = false;
        };
    },
});