import React from "react";
import { withRouter, useHistory } from 'react-router-dom';
import * as Auth from './Auth';
  


function Login(props){
  const history = useHistory();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e){
    setEmail(e.target.value)
  }

  function handleChangePassword(e){
    setPassword(e.target.value)
  }

  function handleSubmit(){
    Auth.authorize( password, email)
    .then((res) => {
      console.log(res)
        props.handleLogin()
        history.push('/')
        localStorage.setItem('jwt', res.token);
        props.setPersonalEmail(email)
    })
    .catch (error => console.log(error))
  }

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
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        id="login-password"
        name="password"
        placeholder="Пароль"
        type="password"
        className="login__input login__input_type_password"
        autoComplete="off"
        required
        value={password}
        onChange={handleChangePassword}
      />
      <button onClick={handleSubmit} className='login__button' type="submit">Войти</button>
    </section>
  )
}

export default withRouter(Login);