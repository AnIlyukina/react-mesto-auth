import React from "react";
import { Link, withRouter } from 'react-router-dom'; 
import * as Auth from './Auth';
import useForm from "../Hooks/useForm";


function Register(props){

  const {handleChange , values , errors, isValid } = useForm()


  function handleSubmit(event) {
    event.preventDefault()
    props.handleSubmitRegister(values.email, values.password);
  }
 

  return(
    <section className="register">
      <form class = 'form'>
        <h2 className="register__title">Регистрация</h2>
        <input
          id="register-email"
          name="email"
          placeholder="Email"
          type="email"
          className="register__input register__input_type_email"
          autoComplete="off"
          required
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="register__error">{errors.email}</span>
        <input
          id="register-password"
          name="password"
          placeholder="Пароль"
          type="password"
          className="register__input register__input_type_password"
          autoComplete="off"
          minLength="6"
          required
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className="register__error">{errors.password}</span>
        <button onClick={handleSubmit} className={`register__button ${!isValid ? 'register__button_disabled': ''}`} type="submit">Зарегистрироваться</button>
        <Link to="/sign-in" className="register__link-login">Уже зарегистрированы? Войти</Link>
      </form>

    </section>
  )
}

export default withRouter(Register);