import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../Hooks/useForm";

function AddPlacePopup(props) {

  const {handleChange, values, isValid, errors, setValues, setIsValid, setErrors } = useForm()

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values.title,
      link: values.link
    });
  }

  React.useEffect(() => {
    setValues({})
    setErrors({})
    setIsValid(false)
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      formName="add-form"
      title="Новое место"
      textButton="Создать"
      textButtonLoading = "Создается..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid = {isValid}
      isLoading = {props.isLoading}
    >
      <input
        name="title"
        placeholder="Название"
        type="text"
        className="popup__input popup__input_type_title"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
        value={values.title || ''}
        onChange={handleChange}
      />
      <span id="title-error" className="error">{errors.title}</span>
      <input
        name="link"
        placeholder="Ссылка"
        type="url"
        className="popup__input popup__input_type_link"
        autoComplete="off"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span id="link-error" className="error">{errors.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;