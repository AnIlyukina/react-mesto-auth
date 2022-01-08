import React from "react";

function Login(){
  return(
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <input
        id="login-email"
        name="email"
        placeholder="Email"
        type="email"
        className="login__input login__input_type_email"
        autoComplete="off"
        required
      />
      <input
        id="login-password"
        name="password"
        placeholder="Пароль"
        type="password"
        className="login__input login__input_type_password"
        autoComplete="off"
        required
      />
      <button className='login__button' type="submit">Войти</button>
    </section>
  )
}

export default Login;