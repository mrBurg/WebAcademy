import React, { Component, ReactElement } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import style from './App.module.scss';

import {
  setToLocalStorage,
  getFromLocalStorage,
  removeItemFromLocalStorage
} from '../../utils';

import { routes } from './Routes';

import { Header } from './../Header';

// http://trello-clone-redux.herokuapp.com/

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

interface IRoute {
  path: string;
  exact: boolean;
  component(): ReactElement;
}

const TOKEN_STORAGE_KEY = 'TOKEN';

export class App extends Component<{}, IAppState> {
  public state = {
    token: '',
    boards: []
  };

  public constructor(props: IAppProps) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  private async setToken(token: string): Promise<void> {
    this.setState({ token });

    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }

  private getToken(): string | null {
    return getFromLocalStorage(TOKEN_STORAGE_KEY);
  }

  private getTokenFromUrl(): string {
    return window.location.hash.split('=')[1];
  }

  private get isLoggedIn(): string {
    return this.state.token;
  }

  private logout(): void {
    removeItemFromLocalStorage(TOKEN_STORAGE_KEY);

    this.setState({
      token: ''
    });
  }

  public componentDidMount(): void {
    let savedToken = this.getToken();
    let newToken = this.getTokenFromUrl();

    if (newToken) this.setToken(savedToken || newToken);
  }

  public render(): ReactElement {
    return (
      <>
        <Header isLoggedIn={!!this.isLoggedIn} logout={this.logout} />
        <main className={style.main}>
          {routes.map(
            (route: any, index: number): ReactElement => {
              let { path, exact, component } = route;

              return (
                <Route
                  key={index}
                  exact={exact}
                  path={path}
                  render={(props: RouteComponentProps): ReactElement => {
                    console.info(props);
                    return component;
                  }}
                />
              );
            }
          )}
          <Route
            path="/"
            exact
            render={(): ReactElement => (
              <h1>
                Wellcome to <span style={{ color: 'red' }}>Trello Clone</span>
              </h1>
            )}
          />
        </main>
      </>
    );
  }
}
