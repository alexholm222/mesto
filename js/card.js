//класс для создания карточки
export class Card {
  //конструктор принимает в себя данные карточки
  constructor (name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //приватный метод для создания разметки карточки
  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  //публичный метод, добавляет данные в разметку
  generateCard () {
    //записали разметку в приватное поле _element
    this._element = this._getTemplate();
    //добавили слушатели в функцию создания карточки
    this._setEventListeners();
    // добавили данные в разметку
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    //вернули элемент с данными в разметке
    return this._element
  }

  //слушатели методов карточки
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', ()=> {
      this._cardLike();
    });

    this._element.querySelector('.card__delete').addEventListener('click', ()=> {
      this._cardDelete();
    });

    this._element.querySelector('.card__overlay').addEventListener('click', () => {
      this._openPopupCard();
    });
  }
  //функция лайка карточки
  _cardLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
  // функция удаления карточки
  _cardDelete() {
    this._element.querySelector('.card__delete').closest('.card').remove();
  }
  //функция открытия изображения карточки
  _openPopupCard() {
    document.querySelector('.popup-card__title').textContent = this._name;
    document.querySelector('.popup-card__image').src = this._link;
    document.querySelector('.popup-card__image').alt = this._name;
    document.querySelector('.popup-card').classList.add('popup_opened');
  }
}

