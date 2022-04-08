//класс для создания карточки
export default class Card {
  //конструктор принимает в себя данные карточки
  constructor (data, cardSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLike = handleDeleteLike;
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
    if(this._ownerId !== this._userId) {
      this._cardDelete.classList.add('card__delete_hidden')
    }
    let likesArr = [];
    this._likes.forEach((obj) =>{
      likesArr.push(obj._id);
    })
    if (likesArr.includes(this._userId)) {
      this._cardLike.classList.add('card__like_active');
    }
    //добавили слушатели в функцию создания карточки
    this._setEventListeners();
    this.setLikes(this._likes)
    // добавили данные в разметку
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    //вернули элемент с данными в разметке
    return this._element
  }

  //слушатели методов карточки
  _setEventListeners() {
    this._cardLike.addEventListener('click', (evt)=> {
      this._likeCard();
       if(evt.target.classList.contains('card__like_active')) {
         this._handleLikeClick(this._cardId);
      } else {
        this._handleDeleteLike(this._cardId);
      }
    });

    this._cardDelete.addEventListener('click', ()=> {
      this._handleDeleteClick(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
  //функция лайка карточки
  _likeCard() {
      this._cardLike.classList.toggle('card__like_active')
    }

  //функция счетчик лайков
  setLikes(like) {
    const likesCounter = this._element.querySelector('.card__counter-like');
    likesCounter.textContent = like.length;
  }

  // функция удаления карточки
  deleteCard() {
    this._cardDelete.closest('.card').remove();
  }
}

