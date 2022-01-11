import headerLogo from "../images/header__logo.svg";
import React from "react";
import { Link , useLocation } from "react-router-dom";

function Header(props) {
  const { pathname} = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {props.loggedIn
            ? (<>
                <div className='header__info'>
                  <span className="header__info-email">{props.personalEmail}</span>
                  <a onClick={props.signOut} className='header__link header__link_type_out'>Выйти</a>
                </div>
              </>
            )
            : (
              <Link 
                to ={`${pathname === '/sign-in' ? '/sign-up' : '/sign-in' }`} 
                className="header__link"
               >
                {`${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
              </Link>
            )
          }
    </header>
  );
}

export default Header;