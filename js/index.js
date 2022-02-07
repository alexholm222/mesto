let editButton = document.querySelector('.profile__button-edit');
let addButton = document.querySelector('.profile__button-add');
let popUp = document.querySelector('.popup');
let popUpProfile = document.querySelector('.popup_content_profile');
let popUpCard = document.querySelector('.popup_content_card');
let closeButtonProfile = document.querySelector('.popup__button-close_profile');
let closeButtonCard = document.querySelector('.popup__button-close_card');
let formElementProfile = document.querySelector('.popup__form_profile');
let formElementCard = document.querySelector('.popup__form_card');
let nameInput = formElementProfile.querySelector('.popup__input_content_name');
let jobInput = formElementProfile.querySelector('.popup__input_content_job');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__name-subline');
let cardTitle = document.querySelector('.popup__input_content_title');
let cardLink = document.querySelector('.popup__input_content_link');
const cardsContainer = document.querySelector('.gallery__cards');
const cardTemplete = document.querySelector('.card-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция открытия окна редактирования информации в профайле
function openPopupProfile () {
  popUpProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
}
//функция закрытия окна редактирования информации в профайле
function closePopupProfile () {
  popUpProfile.classList.remove('popup_opened');
}
//функция отправки формы данных изменяемых в профайле
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  closePopupProfile ();
}
//функция открытия окна добавление карточки
function openPopupCard () {
  popUpCard.classList.add('popup_opened');
}
//функция закрытия окна добавление карточки
function closePopupCard () {
  popUpCard.classList.remove('popup_opened');
}
//функция лайка карточки
function cardLike (evt) {
  evt.target.classList.toggle('card__like_active');
}
//функция удаления карточки
function cardDelete(evt) {
  evt.target.closest('.card').remove();
}

//функция добавляющая 6 карточек из массива при загрузке страницы
initialCards.forEach(function (element) {
  cardElement = cardTemplete.querySelector('.card').cloneNode(true);
//выбор данных для карточки из масива
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
//выбор данных из масива для попапа с картинкой
  cardElement.querySelector('.popup-card__title').textContent = element.name;
  cardElement.querySelector('.popup-card__image').src = element.link;
  cardElement.querySelector('.popup-card__image').alt = element.name;
  const popupImg = cardElement.querySelector('.popup-card');
//Слушатели для кнопки лайка и кнопки удаления карточки
  cardElement.querySelector('.card__like').addEventListener('click', cardLike);
  cardElement.querySelector('.card__delete').addEventListener('click', cardDelete);
//Слушатели для открытия попапа с картинкой и закрытия
  cardElement.querySelector('.card__overlay').addEventListener('click', function() {
    popupImg.classList.add('popup-card_opened');
  });
  cardElement.querySelector('.popup-card__button').addEventListener('click', function() {
    popupImg.classList.remove('popup-card_opened');
  });

  cardsContainer.append(cardElement);
});


function formSubmitHandlerCard (evt) {
  evt.preventDefault();
  cardElement = cardTemplete.querySelector('.card').cloneNode(true);
//данные для карточки вводимые пользователем в форме
  cardElement.querySelector('.card__title').textContent = cardTitle.value;
  cardElement.querySelector('.card__image').src = cardLink.value;
  cardElement.querySelector('.card__image').alt = cardTitle.value;
//данные для попапа с катинкой вводимые пользователем в форме
  cardElement.querySelector('.popup-card__title').textContent = cardTitle.value;
  cardElement.querySelector('.popup-card__image').src = cardLink.value;
  cardElement.querySelector('.popup-card__image').alt = cardTitle.value;

  const popupImg = cardElement.querySelector('.popup-card');
//Слушатели для кнопки лайка и кнопки удаления карточки
  cardElement.querySelector('.card__like').addEventListener('click', cardLike);
  cardElement.querySelector('.card__delete').addEventListener('click', cardDelete);
//Слушатели для открытия попапа с картинкой и закрытия
  cardElement.querySelector('.card__overlay').addEventListener('click', function() {
    popupImg.classList.add('popup-card_opened');
  });
  cardElement.querySelector('.popup-card__button').addEventListener('click', function() {
    popupImg.classList.remove('popup-card_opened');
  });

  cardsContainer.prepend(cardElement);
  closePopupCard ();
  formElementCard.reset();
}


editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupCard);
closeButtonProfile.addEventListener('click', closePopupProfile);
formElementProfile.addEventListener('submit', formSubmitHandler);
closeButtonCard.addEventListener('click', closePopupCard);
formElementCard.addEventListener('submit', formSubmitHandlerCard);








