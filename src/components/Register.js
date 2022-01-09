import React from "react";
import { Link, withRouter } from 'react-router-dom'; 
import * as Auth from './Auth';



function Register(props){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value); 
  }

  function handleSubmit() {
    props.handleSubmitRegister(email, password);
  }
 

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
        value={email || ''}
        onChange={handleChangeEmail}
      />
      <input
        id="register-password"
        name="password"
        placeholder="Пароль"
        type="password"
        className="register__input register__input_type_password"
        autoComplete="off"
        required
        value={password || ''}
        onChange={handleChangePassword}
      />
      <button onClick={handleSubmit} className='register__button' type="submit">Зарегистрироваться</button>
      <Link to="/sign-in" className="register__link-login">Уже зарегистрированы? Войти</Link>

    </section>
  )
}

export default withRouter(Register);