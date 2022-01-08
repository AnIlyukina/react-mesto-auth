import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props){

  function handleSubmit(e){
    e.preventDefault();
    props.onSubmitDeleteCard(props.card)
  }
  
  return(
    <PopupWithForm
      name="confirm"
      formName="confirmation-form"
      title="Вы уверены?"
      saveButton="boxModel"
      textButton="Да"
      isOpen = {props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;