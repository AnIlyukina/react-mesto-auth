import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__items">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <button
              className="profile__edit-button profile__edit-button_type_avatar"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-main">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button profile__edit-button_type_info"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <div className="profile__info-vocation">{currentUser.about}</div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
