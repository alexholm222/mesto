//функция создания карточки
function createCard (name, link) {
  const cardTemplete = document.querySelector('.card-template').content;
  const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  //данные для карточки
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  //Слушатели для кнопки лайка и кнопки удаления карточки
  cardElement.querySelector('.card__like').addEventListener('click', cardLike);
  cardElement.querySelector('.card__delete').addEventListener('click', cardDelete);

  //Слушатель для открытия попапа
  cardElement.querySelector('.card__overlay').addEventListener('click', () => {
    //данные для попапа с катинкой
    popUpCardTitle.textContent = name;
    popUpCardImage.src = link;
    popUpCardImage.alt = name;
    //открытие попапа
    openPopup(popupImg);
  });
  return cardElement
}


//функция лайка карточки
//function cardLike (evt) {
 // evt.target.classList.toggle('card__like_active');
//}
//функция удаления карточки
//function cardDelete(evt) {
 // evt.target.closest('.card').remove();
//}
