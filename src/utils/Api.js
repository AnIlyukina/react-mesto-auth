class Api {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._token = option.token;
  }

  // Функция которая возвращает ответ сервера
  _serverResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  // Получение информации о пользователе с сервера
  getInfoDate() {
    return fetch(`${this._baseUrl}users/me/`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Получение массива карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}cards/`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Сохранение новых данных о пользователе
  saveInfoDate(user) {
    return fetch(`${this._baseUrl}users/me/`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: `${user.name}`,
        about: `${user.about}`,
      }),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Измнение аватара
  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Сохранение новых карточек
  saveCard(data) {
    return fetch(`${this._baseUrl}cards/`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Удаление карточек
  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Изменение лайка на карточках

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-type": "application/json",
        },
      }).then((res) => {
        return this._serverResponse(res);
      });
    } else {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-type": "application/json",
        },
      }).then((res) => {
        return this._serverResponse(res);
      });
    }
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-30/",
  token: "e95f6452-4a83-47bc-9602-e1836af50369",
});

export default api;