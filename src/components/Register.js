import React from "react";

function Register(){
  return(
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <input
        id="register-email"
        name="email"
        placeholder="Email"
        type="email"
        className="register__input register__input_type_email"
        autoComplete="off"
        required
      />
      <input
        id="register-password"
        name="password"
        placeholder="Пароль"
        type="password"
        className="register__input register__input_type_password"
        autoComplete="off"
        required
      />
      <button className='register__button' type="submit">Зарегистрироваться</button>
      <a className="register__link-login">Уже зарегистрированы? Войти</a>

    </section>
  )
}

export default Register;