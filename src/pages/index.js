import './index.css'
import Card from '../components/Сard.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js'
import {api} from '../components/Api.js'
import {editButton, addButton, popUpContentProfile,
        popUpContentCard, popUpContentImg, nameInput,
        jobInput, profileName, profileSubline,
        cardsContainer, validationConfig, popupDelete, avatar, popupAvatar, avatarButton} from '../utils/constants.js'
//функция loader
function loader(isLoading , formSelector, buttonText) {
  const form = document.querySelector(formSelector);
  const buttonSelector = form.querySelector('.popup__button');
  if (isLoading) {
    buttonSelector.textContent  = 'Сохранение...'
  } else {
    buttonSelector.textContent = buttonText
  }
}
//создадим экземпляр класса UserInfo
const userInfo = new UserInfo (profileName, profileSubline);
// создаем экземпляр класса PopupWithImage
const popupImage = new PopupWithImage(popUpContentImg);
// создаем экземпляр класса PopupWithForm для формы удаления карточки
const deletePopup = new PopupWithForm(popupDelete, {})

//Загружаем информацию профиля с сервера
let userId
api.getUserInformation()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about);
    avatar.src = data.avatar;
    userId = data._id
  })
  .catch(err => console.log(err))

   //добавление информации о пользователе и отправка на сервер через форму
const newProfile = new PopupWithForm (popUpContentProfile, {
  submitForm: (inputValue) => {
    loader(true , popUpContentProfile)
    api.submitUserInformation(inputValue.inputName, inputValue.inputJob)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        newProfile.close()
      })
      .catch(err =>console.log(err))
      .finally(()=> {
        loader(false, popUpContentProfile, 'Сохранить')
      })
  }
});

//обновление аватара пользователя
const newAvatar = new PopupWithForm (popupAvatar, {
  submitForm: (inputValue) => {
    loader(true, popupAvatar)
    api.submitUserAvatar(inputValue.inputAvatar)
      .then(res => {
        avatar.src = res.avatar;
        newAvatar.close()
      })
      .catch(err =>console.log(err))
      .finally(()=> {
        loader(false, popupAvatar, 'Сохранить')
      })
  }
});

//функция создания карточки(возвращает готовую карточку)
function createCard(item) {
  const card = new Card (item, '.card-template', userId, handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLike);
  //функция открытия попапа просмотра картинки (функцию передаем в конструктор класса Card),
  function handleCardClick(name, link) {
    popupImage.open({name, link})
  };
  //функция удаления карточки по id (передаем в конструктор класса Card, вытаскиваем id через аргумент функции)
  function handleDeleteClick(id) {
    deletePopup.open();
    deletePopup.changeSubmitForm(()=> {
      api.deleteCard(id)
        .then(res => {
          card.deleteCard()
          deletePopup.close()
        })
        .catch(err =>console.log(err))
    });
  };
  //функции постановки  и снятие лайка
  function handleLikeClick(id) {
    api.LikeCard(id)
      .then(res => card.setLikes(res.likes))
      .catch(err =>console.log(err));
  }
  function handleDeleteLike(id) {
    api.deleteLikeCard(id)
      .then(res=> card.setLikes(res.likes))
      .catch(err =>console.log(err));
  }
  const cardElement = card.generateCard();
  return cardElement
}

//созадем экземпляр класса Section для дальнейшего вызова методов renderItems и addItem
const section = new Section (
  {
    renderer: (item) => {
      section.addItem(createCard(item));
    }
  }, cardsContainer);

//Загружаем карточки с сервера и вставляем в разметку
api.getInitialCards()
  .then(cardItem => section.renderItems(cardItem.reverse())
  )
  .catch(err => console.log(err))

//добавление новых карточек через форму, отправка данных на сервер (используем функцию createCard для генерации карточки,
//добавляем карточку в разметку при помощи публичного метода addItem класса Section)
const formCard = new PopupWithForm (popUpContentCard, {
  submitForm: (inputValue) => {
    const newCard = {
      name: inputValue.inputTitle,
      link: inputValue.inputLink,
    };
    loader(true, popUpContentCard)
    api.submitCards(newCard)
      .then(res => {
        section.addItem(createCard(res))
        formCard.close()
      })
      .catch(err => console.log(err))
      .finally(()=> {
        loader(false, popUpContentCard, 'Создать')
      })
  }
});

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
  jobInput.value = profileInfo.info;
  formValidators['popup-profile'].resetValidation();
  newProfile.open();
});
addButton.addEventListener('click', () => {
  formValidators['popup-card'].resetValidation();
  formCard.open();
});
avatarButton.addEventListener('click', () => {
  formValidators['popup-avatar'].resetValidation();
  newAvatar.open();
});
//слушатели различных экземпляров классов
popupImage.setEventListeners()
deletePopup.setEventListeners()
newProfile.setEventListeners()
newAvatar.setEventListeners()
formCard.setEventListeners()
