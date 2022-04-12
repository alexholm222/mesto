import Popup from '../components/Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button')
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValue = {};
    this._inputList.forEach((inputElement) => {
      const inputName = inputElement.getAttribute('name');
      inputValue[inputName] = inputElement.value
    });
    return inputValue
  }

  changeSubmitForm(newSubmitForm) {
    this._submitForm = newSubmitForm;
  }

  renderLoading(isLoading, buttonText ='Сохранить') {
    if (isLoading) {
      this._submitButton.textContent  = 'Сохранение...'
    } else {
      this._submitButton.textContent = buttonText
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._popupForm.reset()
  }

}
