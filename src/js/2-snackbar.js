// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('input[name="delay"]');
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const state = event.target.elements.state.value;
  document.querySelector('.form').reset();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.success({
          title: '✅',
          message: `Fulfilled promise in ${delay}ms`,
        });
        resolve('Success');
      } else {
        iziToast.error({
          title: '❌',
          message: `Rejected promise in ${delay}ms`,
        });
        reject('Rejected');
      }
    }, delay);
  });
  promise
    .then(result => console.log(result))
    .catch(error => console.error(error));
});
