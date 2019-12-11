import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

import Logo from './../../svg/my-trello-logo.svg';

import { routes } from './../App/Routes';

interface IProps {
  isLoggedIn: boolean;
  logout(): void;
}

interface IRoute {
  path: string;
  title: string;
}

function SignOut({ isLoggedIn, logout }: IProps): ReactElement | null {
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

export function Header({ isLoggedIn, logout }: IProps): ReactElement {
  return (
    <header className={style.header}>
      <Link to="/" className={style.link}>
        <img src={Logo} alt="Logo" className={style.logo} />
      </Link>
      <nav className={style.nav}>
        {routes.map(
          (route: IRoute, index: number): ReactElement => {
            let { path, title } = route;

            return (
              <li key={index}>
                <Link to={path} className={style.link}>
                  {title}
                </Link>
              </li>
            );
          }
        )}
      </nav>
      <SignOut isLoggedIn={isLoggedIn} logout={logout} />
    </header>
  );
}
