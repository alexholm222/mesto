let editbutton = document.querySelector('.profile__button-edit');
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_content_name');
let jobInput = formElement.querySelector('.popup__input_content_job');
let ProfileName = document.querySelector('.profile__name');
let ProfileSubline = document.querySelector('.profile__name-subline');

function openPopup () {
  popUp.classList.add('popup_opened');
  nameInput.value = ProfileName.textContent;
  jobInput.value = ProfileSubline.textContent;
}

editbutton.addEventListener('click', openPopup);

function closePopup () {
  popUp.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileSubline.textContent = jobInput.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);
