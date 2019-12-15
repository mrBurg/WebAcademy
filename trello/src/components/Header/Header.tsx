import React, { ReactElement, Component } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

import Logo from './../../svg/my-trello-logo.svg';

import { routes, IAppRoute } from './../App/Routes';

interface ISignOutProps {
  (): void;
}

interface IHeaderProps {
  isLoggedIn: boolean;
  logout(): void;
}

export class Header extends Component<IHeaderProps> {
  private renderSignOut = (logout: ISignOutProps): ReactElement => {
    return (
      <div className={style.signout}>
        Let's be motivated!
        <button className={`ui-button ${style['ui-button']}`} onClick={logout}>
          Sign Out
          {/* <img src={isLoggedIn ? SignOut : SignIn} alt='SignOut' /> */}
        </button>
      </div>
    );
  };

  public render(): ReactElement {
    let { isLoggedIn, logout } = this.props;

    return (
      <header className={style.header}>
        <Link to='/' className={style.link}>
          <img src={Logo} alt='Logo' className={style.logo} />
        </Link>
        <nav className={style.nav}>
          {routes.map(
            (route: IAppRoute, index: number): ReactElement | null => {
              let { path, title, isHidden } = route;

              return isHidden ? null : (
                <li key={index}>
                  <Link to={path} className={style.link}>
                    {title}
                  </Link>
                </li>
              );
            }
          )}
        </nav>
        {isLoggedIn && this.renderSignOut(logout)}
      </header>
    );
  }
}
