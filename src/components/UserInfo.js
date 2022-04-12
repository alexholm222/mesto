export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector, userIdSelector) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = document.querySelector(userIdSelector);
  };

  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      info: this._info.textContent
    };
    return profileInfo
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    this._userId.textContent = _id;
  }
}
