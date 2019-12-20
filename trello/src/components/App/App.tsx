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

import { routes, IAppRoute, URLS } from '../Routes';

import { ProtectedRoute } from '../ProtectedRoutes';
import { Header } from './../Header';
import { OAuth } from './../OAuth';
import { IBoard } from '../DashBoard';
import { IUserProfile } from '../UserProfile';

interface IAppProps extends RouteComponentProps {}

export interface IAppState {
  token?: string;
  boards?: Array<IBoard>;
  userProfile?: IUserProfile;
}

// const TOKEN_STORAGE_KEY = 'TRELLO_TOKEN';
// const { REACT_APP_KEY } = process.env;

const INITIAL_STATE: IAppState = {
  token: ''
};

class App extends Component<IAppProps, IAppState> {
  public state = INITIAL_STATE;

  /* private async getToken() {
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

    try {
      throw new ReferenceError('Token expired');
    } catch (error) {
      console.info(error);
    }

    this.navigateTo(URLS.LOGIN);
  } */

  /* private get isLoggedIn(): boolean {
    return !!this.state.token;
  } */

  /* private logout = (): void => {
		removeItemFromLocalStorage(TOKEN_STORAGE_KEY);

		this.setState(INITIAL_STATE);
		this.navigateTo(URLS.LOGIN);
	}; */

  /* private navigateTo(url: URLS) {
    this.props.history.push(url);
  } */

  public componentDidMount(): void {
    // this.getToken();
  }

  private renderRoute = (route: IAppRoute, index: number): ReactElement => {
    let { path, exact, render } = route;

    if (route.isProtected) {
      return (
        <ProtectedRoute key={index} exact={exact} path={path} render={render} />
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
        <Header />
        <main className={style.main}>
          <Switch>
            {routes.map(this.renderRoute)}

            <Route
              path={URLS.OAUTH}
              render={(props: RouteChildrenProps) => <OAuth {...props} />}
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
