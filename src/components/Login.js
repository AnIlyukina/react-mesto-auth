import React from "react";
import { withRouter } from 'react-router-dom';
import useForm from "../Hooks/useForm";
  


function Login(props){

  const {handleChange, values, errors, isValid} =useForm()


  function handleSubmit(event){
    event.preventDefault()
    props.handleSubmitLogin(values.password, values.login)
  }

  return(
    <section className="login">
      <form className="form">
        <h2 className="login__title">Вход</h2>
        <input
          name="login"
          placeholder="Email"
          type="email"
          className="login__input login__input_type_email"
          autoComplete="off"
          required
          value={values.login}
          onChange={handleChange}
        />
        <span className="register__error">{errors.login}</span>
        <input
          name="password"
          placeholder="Пароль"
          type="password"
          className="login__input login__input_type_password"
          autoComplete="off"
          required
          minLength="6"
          value={values.password}
          onChange={handleChange}
        />
        <span className="register__error">{errors.password}</span>
        <button onClick={handleSubmit} className={`login__button ${!isValid ? 'register__button_disabled' : ''}`} type="submit">Войти</button>
      </form>
    </section>
  )
}

export default withRouter(Login);