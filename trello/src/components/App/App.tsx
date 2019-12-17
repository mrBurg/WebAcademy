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

import { routes, IAppRoute, URLS } from '../Routes';

import { Header } from './../Header';
import { OAuth } from './../OAuth';
import { ProtectedRoute } from '../ProtectedRoutes';
import { IUserProfile } from '../UserProfile';
import { IBoard } from '../DashBoard';

interface IAppProps extends RouteComponentProps {}

export interface IAppState {
  token: string;
  boards?: Array<IBoard>;
  userProfile?: IUserProfile;
}

const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';
const { REACT_APP_KEY } = process.env;

const INITIAL_STATE: IAppState = {
  token: ''
};

class App extends Component<IAppProps, IAppState> {
  public state = INITIAL_STATE;

  private setToken = (token: string): void => {
    this.setState({ token });

    setToLocalStorage(TOKEN_STORAGE_KEY, token);
  };

  private async getToken() {
    if (this.state.token) return;

    const token = getFromLocalStorage(TOKEN_STORAGE_KEY);

    if (!token) return this.navigateTo(URLS.LOGIN);

    const url = `https://api.trello.com/1/members/me
      ?key=${REACT_APP_KEY}
      &token=${token}`.replace(/[\s\n]/g, '');

    const response = await fetch(url);

    let { ok, status } = response;

    if (ok && status === 200) {
      const userProfile = await response.json();

      this.setState({ userProfile, token });

      return this.navigateTo(URLS.DASH_BOARD);
    }

    return this.navigateTo(URLS.LOGIN);
  }

  private get isLoggedIn(): boolean {
    return !!this.state.token;
  }

  private logout = (): void => {
    removeItemFromLocalStorage(TOKEN_STORAGE_KEY);

    this.setState(INITIAL_STATE);
    this.navigateTo(URLS.LOGIN);
  };

  private navigateTo(url: URLS) {
    this.props.history.push(url);
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
          render={(props: RouteChildrenProps): ReactElement => {
            return render({
              ...props,
              token: this.state.token,
              boards: [
                {
                  id: '1',
                  name: 'name1',
                  pinned: true
                },
                {
                  id: '2',
                  name: 'name2',
                  pinned: false
                }
              ],
              userProfile: this.state.userProfile
            });
          }}
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
              path={URLS.OAUTH}
              render={(props: RouteChildrenProps) => (
                <OAuth {...props} onSetToken={this.setToken} />
              )}
            />
            <Redirect to={URLS.NOT_FOUND} />
          </Switch>
        </main>
      </>
    );
  }
}

const AppWithRouter: ComponentClass = withRouter(App);

export { AppWithRouter as App };
