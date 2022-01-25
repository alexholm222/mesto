let editbutton = document.querySelector('.profile__button-edit');
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let saveButton = document.querySelector('.popup__button-save');

editbutton.addEventListener('click', function() {popUp.classList.add('popup_opened')});

closeButton.addEventListener('click', function() {popUp.classList.remove('popup_opened')});

saveButton.addEventListener('click', function() {popUp.classList.remove('popup_opened')});

let formElement = document.querySelector('.popup__input');
let nameInput = formElement.querySelector('.popup__name-input');
let jobInput = formElement.querySelector('.popup__job-input');
let ProfileName = document.querySelector('.profile__name');
let ProfileSubline = document.querySelector('.profile__name-subline');

nameInput.value = ProfileName.textContent;
jobInput.value = ProfileSubline.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileSubline.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
