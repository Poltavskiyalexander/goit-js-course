import menuItem from '../templates/menu__item.hbs';
import menuJson from '../menu.json';

const menuRef = document.querySelector('ul.js-menu');

// const menuItemHtmlArr = menuJson.map(elem => {
//   return menuItem(elem);
// });
//menuRef.innerHTML = menuItemHtmlArr.join();

menuRef.insertAdjacentHTML('beforeend', menuItem(menuJson));
