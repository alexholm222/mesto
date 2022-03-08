import {Card} from './Сard.js'
import {initialCards} from './initial-cards.js'
import {validationConfig, FormValidator} from './FormValidator.js'
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const popUpContentProfile = document.querySelector('.popup_content_profile');
const popUpContentCard = document.querySelector('.popup_content_card');
const formElementProfile = document.querySelector('.popup__form_profile');
const formElementCard = document.querySelector('.popup__form_card');
const nameInput = formElementProfile.querySelector('.popup__input_content_name');
const jobInput = formElementProfile.querySelector('.popup__input_content_job');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__name-subline');
const cardTitle = document.querySelector('.popup__input_content_title');
const cardLink = document.querySelector('.popup__input_content_link');
const cardsContainer = document.querySelector('.gallery__cards');
const popUpCardTitle = document.querySelector('.popup-card__title');
const popUpCardImage = document.querySelector('.popup-card__image');
const popUpCard = document.querySelector('.popup-card');
const EscCode = 'Escape';
const popUps = Array.from(document.querySelectorAll('.popup'));

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
};

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
 document.removeEventListener('keydown', closeByEscape);
}

//функция открытия окна редактирования информации в профайле
function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  openPopup(popUpContentProfile);
}

//функция отправки формы данных изменяемых в профайле
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  closePopup(popUpContentProfile);
}

//функция создания карточки
function createCard (name, link) {
  const card = new Card (name, link, '.card-template', handleCardClick);
  const cardElement = card.generateCard ();
  return cardElement
}

//функция добавления карточки на страницу
function renderCard(container, item) {
  container.prepend(item);
}

//добавляем 6 карточек из массива при загрузке странцы создаем класс Card каждой карточки
initialCards.forEach((element) => {
  const cardItem = createCard(element.name, element.link);
  renderCard(cardsContainer, cardItem);
});

//функция отправки формы для создания новой карточки на странице
function submitCardForm (evt) {
  evt.preventDefault();
  const cardItem = createCard(cardTitle.value, cardLink.value)
  renderCard(cardsContainer, cardItem);
  closePopup(popUpContentCard);
  formElementCard.reset();
}

//функция открытия попапа просмотра картинки (функцию передаем в конструктор класса Card)
function handleCardClick(name, link) {
  popUpCardTitle.textContent = name;
  popUpCardImage.src = link;
  popUpCardImage.alt = name;
  openPopup(popUpCard);
}

//функция закрытия попапа по нажатию Escape
function closeByEscape (evt) {
  if (evt.key === EscCode) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//создаем класс валидации нужной формы и вызываем публичную функцию валидации
const validateProfile = new FormValidator (validationConfig, '.popup__form_profile');
validateProfile.enableValidation();
//создаем класс валидации нужной формы и вызываем публичную функцию валидации
const validateCard = new FormValidator (validationConfig, '.popup__form_card');
validateCard.enableValidation();

//слушатели кнопок открытия попапов
editButton.addEventListener('click', () => {
  openProfilePopup();
  //вызываем функцию сброса валидации
  validateProfile.resetValidation();
});
addButton.addEventListener('click', () => {
  openPopup(popUpContentCard);
  //вызываем функцию сброса валидации
  validateCard.resetValidation();
  formElementCard.reset();
});

//слушатели отправки форм
formElementProfile.addEventListener('submit', submitProfileForm);
formElementCard.addEventListener('submit', submitCardForm);

// установка слушателя функции закрытия попапа (по нажатию на оверлей и по нажатию на кнопку закрытия), для всех эелементов popup
popUps.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup)
      }
  })
});







