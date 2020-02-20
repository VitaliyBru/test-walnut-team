const popupEl = document.querySelector(`.js-popup`);
const successEl = popupEl ? popupEl.querySelector(`.js-success`) : null;
const closeSuccessBtnEl = successEl ? successEl.querySelector(`.js-close-btn`) : null;
const formModalEl = popupEl ? popupEl.querySelector(`.js-form-modal`) : null;
const closeFormBtnEl = formModalEl ? formModalEl.querySelector(`.js-close-btn`) : null;
let errorMsgEl = null;
let isFormVisible = false;
let isError = false;
let scrollPosition = 0;
let onCloseFormPopup = () => {};

export class PopupController {
  constructor() {}

  // Открывает подложку для попапов
  static openPopupBackLayer () {
    if (!popupEl) {
      console.log(`error: class "js-popup" not found`);
      return;
    }
    popupEl.classList.add(`js-visible`);
    scrollPosition = window.pageYOffset;
    document.body.classList.add(`js-stop-scroll`);

    document.addEventListener(`keydown`, PopupController._onEscKeyPress);
    popupEl.addEventListener(`click`, PopupController._onCloseClick);
  }

  // Закрывает попап и все элементы внутри него
  static closePopup () {
    popupEl.classList.remove(`js-visible`);
    document.body.classList.remove(`js-stop-scroll`);
    document.removeEventListener(`keydown`, PopupController._onEscKeyPress);
    popupEl.removeEventListener(`click`, PopupController._onCloseClick);
    PopupController.setErrorMessageVisible(false);
    if (isFormVisible) {
      onCloseFormPopup();
      this._closeForm();
    } else {
      successEl.classList.remove(`js-visible`);
      closeSuccessBtnEl.removeEventListener(`click`, PopupController._onCloseClick);
    }
    PopupController.setErrorMsgEl(null);
    setTimeout(window.scroll(0, scrollPosition), 50);
  }

  // Открывает попап формы
  static openForm (callBackFn = () => {}) {
    if (!formModalEl || !closeFormBtnEl) {
      console.log(`error: class "js-form-modal" or "js-close-btn" not found`);
      return;
    }

    formModalEl.classList.add(`js-visible`);
    isFormVisible = true;
    closeFormBtnEl.addEventListener(`click`, PopupController._onCloseClick);
  }

  // Открывает попап сообщения об успешной отправке формы
  static openSuccess () {
    if (!successEl || !closeSuccessBtnEl) {
      console.log(`error: class "js-success" or "js-close-btn" not found`);
      return;
    }
    if (isFormVisible) {
      PopupController._closeForm();
    }
    successEl.classList.add(`js-visible`);
    closeSuccessBtnEl.addEventListener(`click`, PopupController._onCloseClick);
  }

  // Текст с сообщением ошибки заполнения формы (если таковой есть в фоме) "true" – отображается "false" – скрывается
  static setErrorMessageVisible (status) {
    if (status === isError || !errorMsgEl) {
      return;
    }
    if (status) {
      errorMsgEl.classList.add(`js-visible`);
      isError = true;
    } else {
      errorMsgEl.classList.remove(`js-visible`);
      isError = false;
    }
  }

  // Задает элемент формы сообщающий об ошибке
  static setErrorMsgEl (formErrorMsgEl) {
    if (errorMsgEl !== formErrorMsgEl) {
      errorMsgEl = formErrorMsgEl;
    }
  }

  // Закрывает попап формы не закрывая подложки
  static _closeForm () {
    formModalEl.classList.remove(`js-visible`);
    isFormVisible = false;
    closeFormBtnEl.removeEventListener(`click`, PopupController._onCloseClick);
    formModalEl.querySelector(`form`).reset();
  }

  static _onEscKeyPress (evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      PopupController.closePopup();
    }
  }

  static _onCloseClick (evt) {
    evt.stopPropagation();
    if (evt.currentTarget !== evt.target) {
      return;
    }
    PopupController.closePopup();
  }
}
