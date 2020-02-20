const DESKTOP_WIDTH = 1200;
const MENU_PADDING = 65;
const TIMEOUT = 50;
const STICKY_TRIGGER_OFFSET = 50;

const headerEl = document.body.querySelector(`.js-header`);
const externalEl = headerEl ? headerEl.querySelector(`.js-external`) : null;
const menuEl = headerEl ? headerEl.querySelector(`.js-menu`) : null;

let stickyShouldCalculate = true;
let fixedShouldCalculate = true;
let isSticky = false;
let isTransitionToSticky = false;

const setHeaderMarginBottom = () => {
  headerEl.style.marginBottom = `-${headerEl.clientHeight}px`;
};

const setMenuPadding = () => {
  if (window.pageYOffset <= STICKY_TRIGGER_OFFSET && window.innerWidth >= DESKTOP_WIDTH) {
    menuEl.style.paddingTop = `${externalEl.clientHeight + MENU_PADDING}px`;
  }
};

const scrollHandler = () => {
  // if (window.innerWidth < DESKTOP_WIDTH) {
  //   return;
  // }

  if (isSticky && window.pageYOffset <= STICKY_TRIGGER_OFFSET) {
    headerEl.classList.remove(`js-sticky`);
    headerEl.style.removeProperty(`position`);
    isSticky = false;
  }

  if (fixedShouldCalculate && !isSticky) {
    fixedShouldCalculate = false;
    setTimeout(setMenuPadding, TIMEOUT);
  }
  if (stickyShouldCalculate && isSticky) {
    setHeaderMarginBottom();
    stickyShouldCalculate = false;
  }

  if (isTransitionToSticky) {
    headerEl.style.position = `sticky`;
    isTransitionToSticky = false;
  }
  if (!isSticky && window.pageYOffset > STICKY_TRIGGER_OFFSET) {
    headerEl.classList.add(`js-sticky`);
    menuEl.style.removeProperty(`padding-top`);
    fixedShouldCalculate = true;
    isSticky = true;
    isTransitionToSticky = true;
  }
};

const resizeHandler = () => {
  if (window.innerWidth < DESKTOP_WIDTH) {
    // if (isSticky) {
    //   headerEl.classList.remove(`js-sticky`);
    //   headerEl.style.removeProperty(`position`);
    //   isSticky = false;
    // }
    if (menuEl.style.paddingTop) {
      menuEl.style.removeProperty(`padding-top`);
    }
    return;
  }

  stickyShouldCalculate = true;
  fixedShouldCalculate = true;
  scrollHandler();
};

export default () => {
  if (!headerEl || !externalEl || !menuEl) {
    return;
  }
  scrollHandler();
  window.addEventListener(`scroll`, scrollHandler);
  window.addEventListener(`resize`, resizeHandler);
  return 0;
}
