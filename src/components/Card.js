import React from "react";
import { CurrentUserContext } from "./../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `elements__delete ${
    isOwn ? "elements__delete_visible" : "elements__delete_hidden"
  }`;

  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like_active" : "elements__like"
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__element">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <div className="elements__group">
        <h3 className="elements__name">{card.name}</h3>
        <div className="elements__activity">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLike}
          ></button>
          <span className="elements__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;