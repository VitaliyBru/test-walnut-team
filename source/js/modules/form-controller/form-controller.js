import axios from "axios";
import Inputmask from "inputmask";
import {PopupController} from "../popup-controller/popup-controller";

export class FormController {
  constructor({formName, importantFields, phoneInputName}) {
    this.formEl = document.forms[formName];
    this.importantFields = importantFields;
    this.inputMask = new Inputmask(`+7 (999) 999-99-99`);
    this.inputMaskEl = document.forms[formName][phoneInputName];
    this.inputMaskEl ? this.inputMask.mask(this.inputMaskEl)
      : console.log(`Форма name="${formName}" не содержит <input name="${phoneInputName}"`);
    this.errorMsg = this.formEl ? this.formEl.querySelector(`.js-error-msg`) : null;
    this.isRequieredAplly = false;
    this._onSubmit = this._onSubmit.bind(this);
  }

  init () {
    if (this.formEl) {
      this.formEl.addEventListener(`submit`, this._onSubmit);
    }
  }

  cancel () {
    this.formEl.removeEventListener(`submit`, this._onSubmit);
    this._formReset();
  }

  _onSubmit (evt) {
    evt.preventDefault();
    if (!this.isRequieredAplly) {
      this._setCheckValidityFields(true);
    }
    PopupController.setErrorMsgEl(this.errorMsg);

    if (this.formEl.checkValidity()) {
      PopupController.setErrorMessageVisible(false);
      this._sendForm();
    } else {
      PopupController.setErrorMessageVisible(true);
    }
  }

  _setCheckValidityFields (status) {
    if (status && this.inputMaskEl) {
      this.inputMaskEl.setAttribute(`pattern`, `^\\+7\\s\\(\\d{3}\\)\\s\\d{3}(-\\d{2}){2}$`);
    } else if (!status && this.inputMaskEl) {
      this.inputMaskEl.removeAttribute(`pattern`);
    }
    this.importantFields.forEach((it) => this.formEl[it].required = status);
    this.isRequieredAplly = status;
  }

  _sendForm() {
    // три последующих строки добавленны для имитации работы. Для полного функционирования необходимо их удалить и
    // раскоментировать анологичные в секции «then» (будет работать только, если в атрибуте action в форме прописан адрес реального сервера)
    PopupController.openPopupBackLayer();
    PopupController.openSuccess();
    this._formReset();

    axios.post(this.formEl.action, new FormData(this.formEl), {timeout: 1000})
      .then((Promise) => {
        // PopupController.openPopupBackLayer();
        // PopupController.openSuccess();
        // this._formReset();
      })
      .catch((err) => {
        console.log(`при отправке формы "${this.formEl.name}" возникла ошибка ${err}`);
      })
  }

  _formReset () {
    this._setCheckValidityFields(false);
    this.formEl.reset();
    PopupController.setErrorMessageVisible(false);
  }
}
