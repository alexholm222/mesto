class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInformation() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
         return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
         return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }

  submitUserInformation(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
         return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }

  submitCards(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
         return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }

  deleteCard(id) {return fetch(`${this._options.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: this._options.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
       return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  LikeCard(id) {return fetch(`${this._options.baseUrl}/cards/${id}/likes `, {
    method: 'PUT',
    headers: this._options.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
       return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  deleteLikeCard(id) {return fetch(`${this._options.baseUrl}/cards/${id}/likes `, {
    method: 'DELETE',
    headers: this._options.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
       return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  submitUserAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
         return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '123cbfe4-9c7c-4071-ae74-17191aaed0ad',
    'Content-Type': 'application/json'
  }
});


