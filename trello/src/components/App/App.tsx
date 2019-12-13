import React, { Component, ReactElement } from 'react';
import { Route, RouteChildrenProps, Switch, Redirect } from 'react-router-dom';

import style from './App.module.scss';

import { setToLocalStorage, removeItemFromLocalStorage } from '../../utils';

import { routes, IAppRoute } from './Routes';

import { Header } from './../Header';
import { OAuth } from './../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

interface IBoard {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface IAppState {
  token: string;
  boards: Array<IBoard>;
}

interface IAppProps {}

const TOKEN_STORAGE_KEY = 'TOKEN';

export class App extends Component<IAppProps, IAppState> {
  public state = {
    token: '',
    boards: []
  };

  private setToken = (token: string): void => {
    this.setState({ token });

    setToLocalStorage(TOKEN_STORAGE_KEY, token);
  };

  private get isLoggedIn(): boolean {
    return !!this.state.token;
  }

  private logout = (): void => {
    removeItemFromLocalStorage(TOKEN_STORAGE_KEY);

    this.setState({
      token: ''
    });
  };

  private renderRoute = (route: IAppRoute, index: number): ReactElement => {
    if (route.isProtected) {
      return (
        <ProtectedRoute
          key={index}
          isAuthenticated={this.isLoggedIn}
          {...route}
        />
      );
    } else {
      let { path, exact, render } = route;

      return (
        <Route
          key={index}
          exact={exact}
          path={path}
          render={(props: RouteChildrenProps): ReactElement =>
            render({ ...props, token: this.state.token })
          }
        />
      );
    }
  };

  public render(): ReactElement {
    return (
      <>
        <Header isLoggedIn={this.isLoggedIn} logout={this.logout} />
        <main className={style.main}>
          <Switch>
            {routes.map(this.renderRoute)}

            <Route
              path='/oauth'
              render={(props: RouteChildrenProps) => (
                <OAuth {...props} onSetToken={this.setToken} />
              )}
            />
            <Redirect to='/404' />
          </Switch>
        </main>
      </>
    );
  }
}
