import Popup from '../components/Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardTitleSelector = this._popup.querySelector('.popup-card__title');
    this._cardImageSelector = this._popup.querySelector('.popup-card__image');
  }
  open(data) {
    this._cardTitleSelector.textContent = data.name;
    this._cardImageSelector.src = data.link;
    this._cardImageSelector.alt = data.name;
    super.open()
  }
}
