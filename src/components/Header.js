import headerLogo from "../images/header__logo.svg";
import React from "react";
import { Link , useLocation } from "react-router-dom";

function Header() {
  const { pathname} = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Link 
        to ={`${pathname === '/sign-in' ? '/sign-up' : '/sign-in' }`} 
        className="header__link"
      >
        {`${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
      </Link>
    </header>
  );
}

export default Header;