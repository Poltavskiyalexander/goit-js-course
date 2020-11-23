import searchCountry from './api';

import countryTemplates from '../templates/country.hbs';
import countryListTemplates from '../templates/countryLlist.hbs';

import debounce from 'lodash/debounce';

import '../../node_modules/@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, info } from '../../node_modules/@pnotify/core/dist/PNotify.js';

const Resf = {
  form: document.querySelector('.country__search-form '),
  input: document.querySelector(
    '.country__search-form input[name="search-query"]',
  ),
  content: document.querySelector('.country__content'),
};

const renderMarkup = searchQuery => {
  if (searchQuery === '') {
    Resf.content.innerHTML = '';
  } else {
    searchCountry(searchQuery)
      .then(data => {
        console.log(data);
        if (data.length === 1) {
          Resf.content.innerHTML = countryTemplates(data[0]);
        } else if (data.length <= 10) {
          Resf.content.innerHTML = countryListTemplates(data);
          let ttt = Resf.content.querySelector('.country__list');
          Resf.content.querySelector('.country__list');
        } else {
          info({
            delay: 3000,
            text: 'Found more than 10 countries. Refine your request.',
          });
        }
      })
      .catch(error => {
        alert({
          delay: 3000,
          text: `Country with name ${searchQuery} not found
          ${error}`,
        });
      });
  }
};

const contentClicktHandler = event => {
  const { target } = event;
  if (target.classList.contains('country__link')) {
    event.preventDefault;
    Resf.input.value = target.innerText;
    renderMarkup(target.innerText);
  }
};

const inputHundler = event => {
  renderMarkup(Resf.input.value);
};
const formSubmitHandler = event => {
  event.preventDefault();
};
const formResetHandler = event => {
  Resf.content.innerHTML = '';
};

Resf.form.addEventListener('submit', formSubmitHandler);
Resf.form.addEventListener('reset', formResetHandler);
Resf.input.addEventListener('input', debounce(inputHundler, 1000));
Resf.content.addEventListener('click', contentClicktHandler);
