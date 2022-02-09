const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const popUpProfile = document.querySelector('.popup_content_profile');
const popUpCard = document.querySelector('.popup_content_card');
const closeButtonProfile = document.querySelector('.popup__button-close_profile');
const closeButtonCard = document.querySelector('.popup__button-close_card');
const formElementProfile = document.querySelector('.popup__form_profile');
const formElementCard = document.querySelector('.popup__form_card');
const nameInput = formElementProfile.querySelector('.popup__input_content_name');
const jobInput = formElementProfile.querySelector('.popup__input_content_job');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__name-subline');
const cardTitle = document.querySelector('.popup__input_content_title');
const cardLink = document.querySelector('.popup__input_content_link');
const cardsContainer = document.querySelector('.gallery__cards');
const popupImg = document.querySelector('.popup-card');
const buttonImgClose = document.querySelector('.popup-card__button');

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
//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//функция открытия окна редактирования информации в профайле
function modPopupProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  openPopup(popUpProfile);
}
//функция отправки формы данных изменяемых в профайле
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  closePopup(popUpProfile);
}
//функция лайка карточки
function cardLike (evt) {
  evt.target.classList.toggle('card__like_active');
}
//функция удаления карточки
function cardDelete(evt) {
  evt.target.closest('.card').remove();
}

//функция создания карточки
function createCard (name, link) {
  const cardTemplete = document.querySelector('.card-template').content;
  const cardElement = cardTemplete.querySelector('.card').cloneNode(true);
  //данные для карточки
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  //Слушатели для кнопки лайка и кнопки удаления карточки
  cardElement.querySelector('.card__like').addEventListener('click', cardLike);
  cardElement.querySelector('.card__delete').addEventListener('click', cardDelete);

  //Слушатель для открытия попапа
  cardElement.querySelector('.card__overlay').addEventListener('click', () => {
    //данные для попапа с катинкой
    document.querySelector('.popup-card__title').textContent = name;
    document.querySelector('.popup-card__image').src = link;
    document.querySelector('.popup-card__image').alt = name;
    //открытие попапа
    openPopup(popupImg);
  });
  return cardElement
}

//функция добавления карточки на страницу
function renderCard(container, item) {
  container.prepend(item);
}

//добавляем 6 карточек из массива при загрузке странцы
initialCards.forEach(function(element) {
  renderCard(cardsContainer, createCard(element.name, element.link));
});
//функция отправки формы для создания новых карточек
function formSubmitHandlerCard (evt) {
  evt.preventDefault();
  renderCard(cardsContainer, createCard(cardTitle.value, cardLink.value));
  closePopup(popUpCard);
  formElementCard.reset();
}

editButton.addEventListener('click', modPopupProfile);
addButton.addEventListener('click', () => openPopup(popUpCard));
closeButtonProfile.addEventListener('click', () => closePopup(popUpProfile));
closeButtonCard.addEventListener('click', () => closePopup(popUpCard));
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitHandlerCard);
buttonImgClose.addEventListener('click', () => closePopup(popupImg));







