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

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info
  }
}
