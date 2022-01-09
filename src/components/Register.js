import React from "react";
import { Link, withRouter, useHistory } from 'react-router-dom'; 
import * as Auth from './Auth';



function Register(){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value); 
  }

  function handleSubmit (){
    Auth.register(email, password).then(() => { history.push('/sign-in') });
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