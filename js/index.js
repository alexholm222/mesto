const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const popUpProfile = document.querySelector('.popup_content_profile');
const popUpCard = document.querySelector('.popup_content_card');
const popupImg = document.querySelector('.popup-card');
const popUpCardTitle = document.querySelector('.popup-card__title');
const popUpCardImage = document.querySelector('.popup-card__image');
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
const buttonImgClose = document.querySelector('.popup-card__button');
const buttonSaveCard = document.querySelector('.popup__button-save_card');
const buttonSaveProfile = document.querySelector('.popup__button-save_profile');
const inputCardArr = Array.from(document.querySelectorAll('.popup__input_card'));
const inputProfileArr = Array.from(document.querySelectorAll('.popup__input_profile'));
const EscCode = 'Escape';

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseEscape);
};
//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseEscape);
}
//функция открытия окна редактирования информации в профайле
function modPopupProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  openPopup(popUpProfile);
}
//функция отправки формы данных изменяемых в профайле
function submitProfileForm (evt) {
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

//функция добавления карточки на страницу
function renderCard(container, item) {
  container.prepend(item);
}

//добавляем 6 карточек из массива при загрузке странцы
initialCards.forEach(function(element) {
  renderCard(cardsContainer, createCard(element.name, element.link));
});
//функция отправки формы для создания новых карточек
function submitCardForm (evt) {
  evt.preventDefault();
  renderCard(cardsContainer, createCard(cardTitle.value, cardLink.value));
  closePopup(popUpCard);
  formElementCard.reset();
}
//функция закрытия попапа по клику на оверлей
function popupCloseOverlay() {
  const popUp = Array.from(document.querySelectorAll('.popup'));
  popUp.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
      }
    })
  })
};
//функция закрытия попапа по нажатию Escape
function popupCloseEscape (evt) {
  if (evt.key === EscCode) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

editButton.addEventListener('click', () => {
  modPopupProfile();
  resetValidation(inputProfileArr, buttonSaveProfile, formElementProfile);
});
addButton.addEventListener('click', () => {
  openPopup(popUpCard);
  resetValidation(inputCardArr, buttonSaveCard, formElementCard);
  formElementCard.reset();
});
closeButtonProfile.addEventListener('click', () => closePopup(popUpProfile));
closeButtonCard.addEventListener('click', () => closePopup(popUpCard));
formElementProfile.addEventListener('submit', submitProfileForm);
formElementCard.addEventListener('submit', submitCardForm);
buttonImgClose.addEventListener('click', () => closePopup(popupImg));

popupCloseOverlay();
