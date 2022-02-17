const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
//функция появления подсказок при ошибке под полем ввода
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
// функция скрывающая подсказки под полем ввода
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
//функция волидации поля ввода (при ошибке показывает подсказку)
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};
//функция валидации каждого поля ввода
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

//функция валидации всех форм в документе
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
   });
}
//функция проверяющая что все поля ввода в форме валидны, если хотя бы одно поле не валидно
//принимает значение true, если все поля валидны то false
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//Функция делающая кнопку отправки не активной если хотя бы одно из полей формы не валидно
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList) === true) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
}

//функция сброса валидации
function resetValidation(inputList, buttonElement, formElement) {
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
}
enableValidation(validationConfig);

