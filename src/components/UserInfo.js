export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  };

  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      info: this._info.textContent
    };
    return profileInfo
  }

  setUserInfo(inputValue) {
    this._name.textContent = inputValue.inputName;
    this._info.textContent = inputValue.inputJob;
  }
}
