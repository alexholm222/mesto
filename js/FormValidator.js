export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export class FormValidator {
  constructor (config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      showInputError(inputElement);
    } else {
      hideInputError(inputElement);
    }
  };

  setEventListeners () {
    console.log(this._formElement)
    console.log(this._inputSelector)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    console.log(this._inputList)
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', this._checkInputValidity(inputElement));
    });
  };
}

