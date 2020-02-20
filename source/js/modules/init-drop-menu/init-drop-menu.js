const droppedMenuEl = document.querySelector(`.js-side-drop`);
const menuBtnEl = droppedMenuEl ? droppedMenuEl.querySelector(`.js-menu-control`) : null;
const menuCloseBtnEl = droppedMenuEl ? droppedMenuEl.querySelector(`.js-menu-close`): null;
const dropDownEl = droppedMenuEl ? droppedMenuEl.querySelector(`.header__dropdown`) : null;

const openMenu = () => {
  droppedMenuEl.classList.add(`js-menu-opened`);
  menuCloseBtnEl.addEventListener(`click`, closeMenu);
  menuBtnEl.removeEventListener(`click`, openMenu);
};

const closeMenu = () => {
  droppedMenuEl.classList.remove(`js-menu-opened`);
  menuCloseBtnEl.removeEventListener(`click`, closeMenu);
  menuBtnEl.addEventListener(`click`, openMenu);
  dropDownEl.scrollTop = 0;
};

export default () => {
  if (!droppedMenuEl || !menuBtnEl || !menuCloseBtnEl || !dropDownEl) {
    console.log(`Mobile menu didn't run. Checkout classes: 'js-side-drop', 'js-menu-control', 'js-menu-close', 'header__dropdown'`);
    return;
  }
  menuBtnEl.addEventListener(`click`, openMenu);
};
