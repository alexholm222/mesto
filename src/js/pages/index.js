import '../../pages/index.css'
import Card from '../components/Сard.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import {editButton, addButton, popUpContentProfile,
        popUpContentCard, popUpContentImg, nameInput,
        jobInput, profileName, profileSubline,
        cardsContainer, validationConfig, initialCards} from '../utils/constants.js'

//функция создания карточки(возвращает готовую карточку)
function createCard(item) {
  const card = new Card (item, '.card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}
//добавление первых 6 карточек при загрузке страницы с помощью класса Section
const cardList = new Section (
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
      cardList.addItem(createCard(item));
    }
  }, cardsContainer);
cardList.renderItems();


//добавление новых карточек через форму (используем функцию createCard для генерации карточки,
//добавляем карточку в разметку при помощи публичного метода addItem класса Section)
const formCard = new PopupWithForm (popUpContentCard, {
  submitForm: (inputValue) => {
    const newCard = {
      name: inputValue.inputTitle,
      link: inputValue.inputLink
    };
    cardList.addItem(createCard(newCard));
  }
});
formCard.setEventListeners()

// создаем экземпляр класса PopupWithImage
const popupImage = new PopupWithImage(popUpContentImg);
popupImage.setEventListeners()
//функция открытия попапа просмотра картинки (функцию передаем в конструктор класса Card),
//используем публичный метод open класса PopupWithImage
function handleCardClick(name, link) {
  popupImage.open({name, link})
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
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.info
  newProfile.open()
  formValidators['popup-profile'].resetValidation()
});

addButton.addEventListener('click', () => {
  formCard.open();
  formValidators['popup-card'].resetValidation()
});








