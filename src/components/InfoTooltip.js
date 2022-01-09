import React from "react";
import infoTooltipIconSuccess from "../images/infoTooltip__icon-success.png";
import infoTooltipIconFail from "../images/infoTooltip__icon-fail.png";

function InfoTooltip(props){
  return(
    <section
      className={`infoTooltip ${props.isOpen ? 'infoTooltip_opened' : ''} ` }
    >
      <div className="infoTooltip__container">
        <button
          type="button"
          className="infoTooltip__close"
          onClick={props.onClose}
        ></button>
       <img className='infoTooltip__icon' src={props.messageInfoTooltip ? infoTooltipIconSuccess : infoTooltipIconFail}/>
       <h2 className="infoTooltip__message">{props.messageInfoTooltip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз'}</h2>
      </div>
    </section>
  )
}

export default InfoTooltip;