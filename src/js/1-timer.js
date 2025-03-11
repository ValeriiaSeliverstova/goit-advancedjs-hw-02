// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
let chosenDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      startButton.disabled = false;
      chosenDate = selectedDates[0];
    } else {
      startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

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

const timer = {
  deadline: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }

      const timeComponents = convertMs(diff);
      this.refs.days.textContent = String(timeComponents.days).padStart(2, '0');
      this.refs.hours.textContent = String(timeComponents.hours).padStart(
        2,
        '0'
      );
      this.refs.minutes.textContent = String(timeComponents.minutes).padStart(
        2,
        '0'
      );
      this.refs.seconds.textContent = String(timeComponents.seconds).padStart(
        2,
        '0'
      );
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },
};

startButton.addEventListener('click', () => {
  timer.deadline = chosenDate;
  timer.start();
  startButton.disabled = true;
});
