import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

import Logo from './../../svg/my-trello-logo.svg';

interface HeaderProps {
  isLoggedIn: boolean;
  logout(): void;
}

function SignOut({ isLoggedIn, logout }: HeaderProps): ReactElement | null {
  if (isLoggedIn) {
    return (
      <div className={style.signout}>
        Let's be motivated!
        <button className={`ui-button ${style['ui-button']}`} onClick={logout}>
          Sign Out
        </button>
      </div>
    );
  }

  return null;
}

export function Header({ isLoggedIn, logout }: HeaderProps): ReactElement {
  return (
    <header className={style.header}>
      <a href="/">
        <img src={Logo} alt="Logo" className={style.logo} />
      </a>
      <nav className={style.nav}>
        <li>
          <Link to="/Login" className={style.link}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/DashBoard" className={style.link}>
            DashBoard
          </Link>
        </li>
      </nav>
      <SignOut isLoggedIn={isLoggedIn} logout={logout} />
    </header>
  );
}
