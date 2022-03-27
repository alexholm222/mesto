import Popup from '../components/Popup.js'
export default class PopupWithImage extends Popup {
  constructor({name, link},popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._cardTitleSelector = this._popupSelector.querySelector('.popup-card__title');
    this._cardImageSelector = this._popupSelector.querySelector('.popup-card__image');
  }
  open() {
    this._cardTitleSelector.textContent = this._name;
    this._cardImageSelector.src = this._link;
    this._cardImageSelector.alt = this._name;
    super.open()
  }
}
