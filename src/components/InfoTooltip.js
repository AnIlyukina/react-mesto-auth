import React from "react";
import infoTooltipIconSuccess from "../images/infoTooltip__icon-success.png";

function InfoTooltip(){
  return(
    <section
      className='infoTooltip'
    >
      <div className="infoTooltip__container">
        <button
          type="button"
          className="infoTooltip__close"
        ></button>
       <img className='infoTooltip__icon' src={infoTooltipIconSuccess}/>
       <h2 className="infoTooltip__message">Вы успешно зарегистрировались!</h2>
   
      </div>
    </section>
  )
}

export default InfoTooltip;