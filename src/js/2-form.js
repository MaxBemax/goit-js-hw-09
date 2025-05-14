import '../css/2-form.css'; // стилі форми
import '../css/button.css'; // стилі кнопки "назад"

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  } catch (error) {
    console.error('Invalid localStorage data', error);
  }
}

form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trimStart();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;

  if (email.trim() === '' || message.trim() === '') {
    alert('Please fill in all fields!');
    return;
  }

  console.log('Submitted:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
