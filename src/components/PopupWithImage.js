import Popup from '../components/Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardTitle = this._popup.querySelector('.popup-card__title');
    this._cardImage = this._popup.querySelector('.popup-card__image');
  }
  open(data) {
    this._cardTitle.textContent = data.name;
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    super.open()
  }
}
