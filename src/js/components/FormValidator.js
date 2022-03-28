export default class FormValidator {
  constructor (config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }
  //функция появления подсказок при ошибке под полем ввода
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  // функция скрывающая подсказки под полем ввода
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  //функция волидации поля ввода (при ошибке показывает подсказку)
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  //функция валидации каждого поля ввода в форме
  _setEventListeners () {
    this._toggleButtonState ()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState ();
      })
    });
  };
  //функция валидации формы
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      this._setEventListeners();
  }
  //функция проверяющая что все поля ввода в форме валидны, если хотя бы одно поле не валидно
  //принимает значение true, если все поля валидны то false
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Функция делающая кнопку отправки не активной если хотя бы одно из полей формы не валидно
  _toggleButtonState ()  {
    if (this._hasInvalidInput() === true) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', '');
    }
    else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled', '');
    }
  }
  //функция сброса валидации (публичный метод)
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

