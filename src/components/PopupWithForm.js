

function PopupWithForm(props) {

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
        ></button>
        <form
          className={`form popup__form popup__form_type_${props.name}`}
          name={props.formName}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__form-title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className={`
                    popup__button popup__form-save ${props.saveButton} ${
                      !props.isFormValid ? "popup__button_disabled" : ""
                    } 
                  `}
          >
            {`${props.isLoader ? props.textButtonLoading : props.textButtonы}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;