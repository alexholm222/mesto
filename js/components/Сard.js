//класс для создания карточки
export default class Card {
  //конструктор принимает в себя данные карточки
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
  generateCard() {
    //записали разметку в приватное поле _element
    this._element = this._getTemplate();

    this._cardTitle = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardDelete = this._element.querySelector('.card__delete');
    //добавили слушатели в функцию создания карточки
    this._setEventListeners();
    // добавили данные в разметку
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    //вернули элемент с данными в разметке
    return this._element
  }

  //слушатели методов карточки
  _setEventListeners() {
    this._cardLike.addEventListener('click', ()=> {
      this._likeCard();
    });

    this._cardDelete.addEventListener('click', ()=> {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
  //функция лайка карточки
  _likeCard() {
    this._cardLike.classList.toggle('card__like_active');
  }
  // функция удаления карточки
  _deleteCard() {
    this._cardDelete.closest('.card').remove();
  }
}

