import headerLogo from "../images/header__logo.svg";
import React from "react";
import { Route, Switch, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Switch>
        <Route exact path='/'>
          <div className='header__info'>
            <span className="header__info-email">{props.userEmail}</span>
            <a onClick={props.signOut} className='header__link header__link_type_out'>Выйти</a>
          </div>
        </Route>
        <Route path = '/sign-in'>
          <Link to='/sign-up' className='header__link '>Регистрация</Link>
        </Route>
        <Route path = '/sign-up'>
          <Link to='/sign-in' className='header__link '>Войти</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;