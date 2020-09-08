const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

document.addEventListener('DOMContentLoaded', () => {
  //Собираем ссылки на нужные ноды
  const refs = {
    body: document.querySelector('body'),
    switchInput: document.querySelector('input.js-switch-input'),
  };
  //инициализируем тему при загрузке страницы
  if (localStorage.getItem('theme') === Theme.DARK) {
    refs.body.classList.add(Theme.DARK);
    refs.switchInput.checked = true;
  } else {
    refs.body.classList.add(Theme.LIGHT);
  }
  //Отслеживаем изменения темы
  refs.switchInput.addEventListener('change', event => {
    if (event.currentTarget.checked) {
      localStorage.setItem('theme', Theme.DARK);
    } else {
      localStorage.removeItem('theme');
    }
    refs.body.classList.toggle(Theme.DARK);
    refs.body.classList.toggle(Theme.LIGHT);
  });
});
