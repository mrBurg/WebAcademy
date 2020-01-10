import React, { ReactElement, Component } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

import { ReactComponent as Logo } from './../../svg/my-trello-logo.svg';

import { routes, IAppRoute, URLS } from '../Routes';
import { IAppState, logout, isAuthenticated } from '../../reduxStore';
import { connect } from 'react-redux';

interface IHeaderProps {
  isLoggedIn: boolean;
  onLogout(): void;
}

class Header extends Component<IHeaderProps> {
  private renderSignOut = (): ReactElement => {
    let { onLogout } = this.props;

    return (
      <li className={style.item}>
        <button
          className={`ui-button ${style['ui-button']}`}
          onClick={onLogout}
        />
      </li>
    );
  };

  public render(): ReactElement {
    let { isLoggedIn } = this.props;

    return (
      <header className={style.header}>
        {/* <nav className={style.nav}>
          <Link to={URLS.HOME} className={style.home} />
        </nav> */}
        <Link to={URLS.HOME} className={style.link}>
          <Logo className={style.logo} />
        </Link>
        <menu className={style.menu}>
          {routes.map(function(
            route: IAppRoute,
            index: number
          ): ReactElement | false {
            let { path, title, isHidden } = route;

            return isHidden ? (
              false
            ) : (
              <li key={index} className={style.item}>
                <Link to={path} className={style.link}>
                  {title}
                </Link>
              </li>
            );
          })}
          {isLoggedIn && this.renderSignOut()}
        </menu>
      </header>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    isLoggedIn: isAuthenticated(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: (): void => dispatch(logout())
  };
};

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export { connectedHeader as Header };
