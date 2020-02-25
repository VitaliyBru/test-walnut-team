import {FormController} from "../form-controller/form-controller";
import {PopupController} from "../popup-controller/popup-controller";

const callbackLinkEl = document.querySelector(`.js-callback`);

const orderForm = new FormController({
  formName: `order`,
  importantFields: [
    `person`,
    `phone`,
    `agreement`
  ],
  phoneInputName: `phone`
});

const callbackForm = new FormController({
  formName: `call`,
  importantFields: [
    `person`,
    `phone`,
    `agreement`
  ],
  phoneInputName: `phone`
});

const onCallbackClick = (evt) => {
  evt.preventDefault();
  PopupController.openPopupBackLayer();
  PopupController.openForm(callbackForm.cancel());
  callbackForm.init();
};

export default () => {
  orderForm.init();
  callbackLinkEl.addEventListener(`click`, onCallbackClick);
}
