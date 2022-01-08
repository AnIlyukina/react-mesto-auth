import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() =>{
    avatarRef.current.value = '';
  },[props.isOpen])

  return (
    <PopupWithForm
      name="avatar"
      formName="avatar-form"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="link-avatar"
        name="link"
        placeholder="Ссылка"
        type="url"
        className="popup__input popup__input_type_avatar"
        autoComplete="off"
        required
        ref={avatarRef}
      />
      <span id="link-avatar-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;