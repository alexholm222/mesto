import '../../pages/index.css'
import Card from '../components/Сard.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import {editButton, addButton, popUpContentProfile,
        popUpContentCard, popUpContentImg, nameInput,
        jobInput, profileName, profileSubline,
        cardsContainer, validationConfig, initialCards} from '../utils/constants.js'

//добавление первых 6 карточек при загрузке страницы
function addCard(cardItem) {
const cardList = new Section (
  {
    items: cardItem,
    renderer: (item) => {
      const card = new Card (item, '.card-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  }, cardsContainer);
cardList.renderItems();
};
addCard(initialCards);

//добавление новых карточек через форму
const createCard = new PopupWithForm (popUpContentCard, {
  submitForm: (inputValue) => {
    const newCard = [{
      name: inputValue.inputTitle,
      link: inputValue.inputLink
    }];
    addCard(newCard);
  }
});
createCard.setEventListeners()

//функция открытия попапа просмотра картинки (функцию передаем в конструктор класса Card)
function handleCardClick(name, link) {
  const popupImage = new PopupWithImage({name, link}, popUpContentImg);
  popupImage.open()
};

//создадим экземпляр класса UserInfo
const userInfo = new UserInfo (profileName, profileSubline);

//добавление информации о пользователе через отправку формы
const newProfile = new PopupWithForm (popUpContentProfile, {
  submitForm: (inputValue) => {
    userInfo.setUserInfo(inputValue)
  }
});
newProfile.setEventListeners()

// Включение валидации всех форм на странице
const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   //объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(validationConfig);

//слушатели кнопок открытия попапов
editButton.addEventListener('click', () => {
  const popupInfo = new Popup(popUpContentProfile);
  const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.info
  popupInfo.open()
  formValidators['popup-profile'].resetValidation()
});

addButton.addEventListener('click', () => {
  const popupCard = new Popup(popUpContentCard);
  popupCard.open();
  formValidators['popup-card'].resetValidation()
});








