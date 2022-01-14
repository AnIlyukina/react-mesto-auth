import React from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "./../context/CurrentUserContext";
import useForm from "../Hooks/useForm";

function EditProfilePopup(props) {

 
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser)

  const { handleChange , values, setValues, setErrors, errors, isValid} = useForm();

  React.useEffect(() => {
    setValues({
      ...values,
      name: currentUser.name,
      about: currentUser.about
    })
    setErrors({})
  }, [currentUser, props.isOpen]);


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return (
    <PopupWithForm
      name="edit"
      formName="edit-form"
      title="Редактировать профиль"
      textButton="Сoхранить"
      textButtonLoading="Сoхранение..."
      isLoading = {props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={ isValid }
    >
      <input
        id="names"
        name="name"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required
        value={ values.name || ''}
        onChange={handleChange}
      />
      <span id="name-error" className="error"> { errors.name }</span>
      <input
        id="vocation"
        name="about"
        type="text"
        placeholder="O себе"
        className="popup__input popup__input_type_vocation"
        minLength="2"
        maxLength="200"
        autoComplete="off "
        required
        value ={ values.about || ''}
        onChange={handleChange}
      />
      <span id="vocation-error" className="error"> { errors.about }</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;