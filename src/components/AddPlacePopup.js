import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newCardName, setNewCardName] = React.useState("");
  const [newCardLink, setNewCardLink] = React.useState("");

  function handleChangeNewCardName(e) {
    setNewCardName(e.target.value);
  }

  function handleChangeNewCardLink(e) {
    setNewCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: newCardName,
      link: newCardLink,
    });
  }

  React.useEffect(() => {
    setNewCardName('');
    setNewCardLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      formName="add-form"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        name="title"
        placeholder="Название"
        type="text"
        className="popup__input popup__input_type_title"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
        value={newCardName}
        onChange={handleChangeNewCardName}
      />
      <span id="title-error" className="error"></span>
      <input
        id="link"
        name="link"
        placeholder="Ссылка"
        type="url"
        className="popup__input popup__input_type_link"
        autoComplete="off"
        required
        value={newCardLink}
        onChange={handleChangeNewCardLink}
      />
      <span id="link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;