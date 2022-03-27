export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  };

  getUserInfo() {
    const profileInfo = {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent
    };
    return profileInfo
  }

  setUserInfo(inputValue) {
    this._nameSelector.textContent = inputValue.inputName;
    this._infoSelector.textContent = inputValue.inputJob;
  }
}
