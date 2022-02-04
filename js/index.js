let editButton = document.querySelector('.profile__button-edit');
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_content_name');
let jobInput = formElement.querySelector('.popup__input_content_job');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__name-subline');

function openPopup () {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
}

function closePopup () {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;
    closePopup ();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
