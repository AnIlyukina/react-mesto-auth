import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./../context/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [valueName, setValueName] = React.useState("");
  const [valueDescription, setValueDescription] = React.useState("");

  React.useEffect(() => {
    setValueName(currentUser.name);
    setValueDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setValueName(e.target.value);
  }

  function handleChangeDescription(e) {
    setValueDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: valueName,
      about: valueDescription,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      formName="edit-form"
      title="Редактировать профиль"
      textButton="Сoхранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        name="full-name"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required
        value={valueName|| ''}
        onChange={handleChangeName}
      />
      <span id="name-error" className="error"></span>
      <input
        id="vocation"
        name="vocation"
        type="text"
        placeholder="O себе"
        className="popup__input popup__input_type_vocation"
        minLength="2"
        maxLength="200"
        autoComplete="off "
        required
        value={valueDescription|| ''}
        onChange={handleChangeDescription}
      />
      <span id="vocation-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;