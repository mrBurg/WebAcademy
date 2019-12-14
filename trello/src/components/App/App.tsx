import React, { Component, ReactElement, ComponentClass } from 'react';
import {
  Route,
  RouteChildrenProps,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';

import style from './App.module.scss';

import {
  setToLocalStorage,
  removeItemFromLocalStorage,
  getFromLocalStorage
} from '../../utils';

import { routes, IAppRoute } from './Routes';

import { Header } from './../Header';
import { OAuth } from './../OAuth';
import { ProtectedRoute } from '../ProtectedRoutes';

interface IBoard {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface IAppState {
  token: string | null;
  boards: Array<IBoard>;
  userProfile: any;
}

interface IAppProps extends RouteComponentProps {}

const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';
const { REACT_APP_KEY } = process.env;
const INITIAL_STATE = {
    token: null,
    boards: [],
    userProfile: null
  }

class App extends Component<IAppProps, IAppState> {
  public state = INITIAL_STATE;

  private setToken = (token: string): void => {
    this.setState({ token });

    setToLocalStorage(TOKEN_STORAGE_KEY, token);
  };

  private async getToken() {
    if (this.state.token) {
      return;
    }

    const token = getFromLocalStorage(TOKEN_STORAGE_KEY);

    if (!token) {
      return this.navigateToLogin();
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_KEY}&token=${token}`;

    const response = await fetch(url);

    let { ok, status } = response;

    if (ok && status === 200) {
      const userProfile = await response.json();

      this.setState({ userProfile, token });

      return this.navigateToDashboard();
    }

    return this.navigateToLogin();
  }

  private get isLoggedIn(): boolean {
    return Boolean(this.state.token);
  }

  private logout = (): void => {
    removeItemFromLocalStorage(TOKEN_STORAGE_KEY);

    this.setState(INITIAL_STATE);
    this.navigateToLogin();
  };

  private navigateToLogin() {
    this.props.history.push('/login');
  }

  private navigateToDashboard() {
    this.props.history.push('/dashboard');
  }

  public componentDidMount(): void {
    this.getToken();
  }

  private renderRoute = (route: IAppRoute, index: number): ReactElement => {
    let { path, exact, render } = route;

    if (route.isProtected) {
      return (
        <ProtectedRoute
          key={index}
          exact={exact}
          path={path}
          render={render}
          isAuthenticated={this.isLoggedIn}
        />
      );
    } else {
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

const AppWithRouter: ComponentClass = withRouter(App);

export { AppWithRouter as App };
