import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  datetimePicker: document.querySelector('#datetime-picker'),
  timer: {
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
  },
};
refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      refs.startBtn.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      if (selectedDates[0].getTime() - Date.now() < 1000) {
        Notiflix.Notify.warning('Time chosen is right now!');
        return;
      }

      refs.startBtn.removeAttribute('disabled');
      refs.startBtn.addEventListener('click', () => {
        refs.startBtn.setAttribute('disabled', '');
        refs.datetimePicker.setAttribute('disabled', '');
        timerStart(selectedDates[0].getTime());
      });
    }
  },
};

function timerStart(endTime) {
  const countdown = setInterval(() => {
    const timeLeft = convertMs(endTime - Date.now());
    for (let key in timeLeft) {
      refs.timer[key].textContent = addLeadingZeroes(timeLeft[key]);
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(countdown);
    refs.datetimePicker.removeAttribute('disabled');
  }, endTime - Date.now());
}

// Additional functions

function addLeadingZeroes(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(refs.datetimePicker, options);
