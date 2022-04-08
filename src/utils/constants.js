export const initialCards = [
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


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const editButton = document.querySelector('.profile__button-edit');
export const addButton = document.querySelector('.profile__button-add');
export const avatarButton = document.querySelector('.profile__overlay');
export const popUpContentProfile = '.popup_content_profile';
export const popUpContentCard = '.popup_content_card';
export const popUpContentImg = '.popup-card';
export const nameInput = document.querySelector('.popup__input_content_name');
export const jobInput = document.querySelector('.popup__input_content_job');
export const profileName = '.profile__name';
export const profileSubline = '.profile__name-subline';
export const cardsContainer = '.gallery__cards';
export const avatar = document.querySelector('.profile__avatar');
export const popupDelete = '.popup_content_delete';
export const popupAvatar = '.popup_content_avatar';
