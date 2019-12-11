import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

import Logo from './../../svg/my-trello-logo.svg';

import { routes, IAppRoute } from './../App/Routes';

interface ISignOutProps {
  isLoggedIn: boolean;
  logout(): void;
}

function SignOut({ isLoggedIn, logout }: ISignOutProps): ReactElement | null {
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

export function Header({ isLoggedIn, logout }: ISignOutProps): ReactElement {
  return (
    <header className={style.header}>
      <Link to="/" className={style.link}>
        <img src={Logo} alt="Logo" className={style.logo} />
      </Link>
      <nav className={style.nav}>
        {routes.map((route: IAppRoute, index: number): ReactElement | null => {
          let { path, title, isHidden } = route;

          return isHidden ? null : (
            <li key={index}>
              <Link to={path} className={style.link}>
                {title}
              </Link>
            </li>
          );
        })}
      </nav>
      <SignOut isLoggedIn={isLoggedIn} logout={logout} />
    </header>
  );
}
