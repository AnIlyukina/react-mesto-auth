import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../Hooks/useForm";


function EditAvatarPopup(props) {

  const {handleChange , values , errors, isValid, setIsValid, setValues, setErrors } = useForm()
  // const avatarRef = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: values.avatar,
    });
    console.log(values)
    console.log(errors)
  }

  React.useEffect(() =>{
    setValues('')
    setErrors({})
    setIsValid(false)
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
      isFormValid={ isValid }
    >
      <input
        id="link-avatar"
        name="avatar"
        placeholder="Ссылка"
        type="url"
        className="popup__input popup__input_type_avatar"
        autoComplete="off"
        required
        onChange={handleChange}
        value={values.avatar || ''}
        // ref={avatarRef}
      />
      <span id="link-avatar-error" className="error">{ errors.avatar }</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;