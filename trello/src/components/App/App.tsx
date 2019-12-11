import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';

import style from './App.module.scss';

import {
  // setToLocalStorage,
  // getFromLocalStorage,
  clearLocalStorage
} from '../../utils';

import { Header } from './../Header';
// import { TokenExpired } from '../Notifications';

import { Login } from './../Login';
import { DashBoard } from './../DashBoard';

// http://trello-clone-redux.herokuapp.com/

interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string | null;
  boards: Array<Board>;
}

interface AppProps {}

export class App extends Component<{}, AppState> {
  public state = {
    token: '',
    boards: []
  };

  public constructor(props: AppProps) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  private async setToken(token: string) {
    this.setState({ token });

    // await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }

  private async getToken() {
    // let token = await getFromLocalStorage(TOKEN_STORAGE_KEY);
    // return token;
  }

  private getTokenFromUrl() {
    return window.location.hash.split('=')[1];
  }

  private get isLoggedIn() {
    return this.state.token;
  }

  private logout() {
    clearLocalStorage();

    this.setState({
      token: ''
    });
  }

  public componentDidMount() {
    // let savedToken = await this.getToken();
    let newToken = this.getTokenFromUrl();

    if (newToken) this.setToken(newToken);
  }

  public render() {
    return (
      <>
        <Header isLoggedIn={!!this.isLoggedIn} logout={this.logout} />
        <main className={style.main}>
          {this.isLoggedIn ? <DashBoard /> : <Login />}
          {/* <Route path="/login" component={User} /> */}
          {/* <Route path="/" exact component={DashBoard} /> */}
        </main>
        {/* <TokenExpired /> */}
      </>
    );
  }
}
