import cardTemplates from '../templates/card.hbs';
import InfiniteScroll from 'infinite-scroll';

const API_KEY = '19126431-639b2ba18eb4caa5d22b03767';
const API_SETTINGS = {
  url: 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  key: API_KEY,
};
const Resf = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form input[name="query"]'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.transition-loader'),
};
let qweryStr = null;

const infScroll = new InfiniteScroll('.gallery', {
  path: function () {
    const constPartUrl = Object.keys(API_SETTINGS).reduce((acc, key) => {
      if (key === 'url') {
        return (acc = `${API_SETTINGS[key]}?${acc}`);
      }
      return (acc = `${acc}${key}=${API_SETTINGS[key]}&`);
    }, '');
    const variablePartUrl = `page=${this.pageIndex}&q=${qweryStr}`;
    return constPartUrl + variablePartUrl;
  },
  responseType: 'text',
  status: '.scroll-status',
  history: false,
});

const loader = status => {
  if (status) {
    Resf.loader.classList.add('loader-activ');
  } else {
    Resf.loader.classList.remove('loader-activ');
  }
};

const submitHandler = event => {
  qweryStr = Resf.input.value;
  if (!qweryStr) {
    return;
  }
  event.preventDefault();
  Resf.gallery.innerHTML = '';

  infScroll.on('load', function (response) {
    const data = JSON.parse(response);
    if (data.total === 0) {
      loader(false);
      return;
    }

    const buffElem = document.createElement('ul');
    buffElem.innerHTML = cardTemplates(data.hits);
    const arrCards = buffElem.querySelectorAll('li');
    infScroll.appendItems(arrCards);
  });
  infScroll.on('request', function () {
    loader(true);
  });
  infScroll.on('append', function () {
    loader(false);
  });
  infScroll.on('error', function () {
    loader(false);
  });
  infScroll.loadNextPage();
};

Resf.form.addEventListener('submit', submitHandler);
