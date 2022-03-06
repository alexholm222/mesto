import {Card} from './card.js'
import {initialCards} from './initial-cards.js'
import {validationConfig, FormValidator} from './FormValidator.js'
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const popUpProfile = document.querySelector('.popup_content_profile');
const popUpCard = document.querySelector('.popup_content_card');
const popupImg = document.querySelector('.popup-card');
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
const popUp = Array.from(document.querySelectorAll('.popup'));

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
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

//функция добавления карточки на страницу
function renderCard(container, item) {
  container.prepend(item);
}

//добавляем 6 карточек из массива при загрузке странцы создаем класс Card каждой карточки
initialCards.forEach((element) => {
  const card = new Card (element.name, element.link, '.card-template');
  const cardItem = card.generateCard ();
  renderCard(cardsContainer, cardItem);
});

//функция отправки формы для создания новой карточки
function submitCardForm (evt) {
  evt.preventDefault();
  const card = new Card (cardTitle.value, cardLink.value, '.card-template');
  const cardItem = card.generateCard()
  renderCard(cardsContainer, cardItem);
  closePopup(popUpCard);
  formElementCard.reset();
}

//функция закрытия попапа по клику на оверлей
function popupCloseOverlay() {
  popUp.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupElement);
      }
    })
  })
};

//функция закрытия попапа по нажатию Escape
function popupCloseEscape() {
  popUp.forEach((popupElement) => {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === EscCode) {
        closePopup(popupElement);
      }
    })
  })
};

editButton.addEventListener('click', () => {
  modPopupProfile();
  //resetValidation(inputProfileArr, buttonSaveProfile, formElementProfile);
});
addButton.addEventListener('click', () => {
  openPopup(popUpCard);
 // resetValidation(inputCardArr, buttonSaveCard, formElementCard);
  formElementCard.reset();
});
closeButtonProfile.addEventListener('click', () => closePopup(popUpProfile));
closeButtonCard.addEventListener('click', () => closePopup(popUpCard));
formElementProfile.addEventListener('submit', submitProfileForm);
formElementCard.addEventListener('submit', submitCardForm);
buttonImgClose.addEventListener('click', () => closePopup(popupImg));

popupCloseOverlay();
popupCloseEscape();


const validdd = new FormValidator (validationConfig, '.popup__form_profile');
validdd.setEventListeners()
