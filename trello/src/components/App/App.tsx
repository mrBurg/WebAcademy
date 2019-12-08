import React, { Component } from 'react';

import './App.scss';

import { setToLocalStorage, getFromLocalStorage } from '../../utils';

// import { Header } from './Header';
// http://trello-clone-redux.herokuapp.com/

const {
  REACT_APP_REDIRECT_URL,
  REACT_APP_EXPIRATION,
  REACT_APP_NAME,
  REACT_APP_SCOPE,
  REACT_APP_RESPONSE_TYPE,
  REACT_APP_KEY
} = process.env;
const TOKEN_STORAGE_KEY = 'TOKEN';

interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<Board>;
}

export class App extends Component<{}, AppState> {
  public state = {
    token: '',
    boards: []
  };

  private async setToken(token: string) {
    this.setState({
      token
    });

    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }

  private async getToken() {
    let token = await getFromLocalStorage(TOKEN_STORAGE_KEY);

    return token;
  }

  private getTokenFromUrl() {
    return window.location.hash.split('=')[1];
  }

  private get isLoggedIn() {
    return this.state.token;
  }

  private renderHeader() {
    let redirectUrl = REACT_APP_REDIRECT_URL,
      expiration = REACT_APP_EXPIRATION,
      appName = REACT_APP_NAME,
      scope = REACT_APP_SCOPE,
      response_type = REACT_APP_RESPONSE_TYPE,
      key = REACT_APP_KEY,
      requestUrl = `https://trello.com/1/authorize
      ?return_url=${redirectUrl}
      &expiration=${expiration}
      &name=${appName}
      &scope=${scope}
      &response_type=${response_type}
      &key=${key}`.replace(/[\s\n]/g, '');

    return (
      <header>
        <h2>Welcome!</h2>
        {this.isLoggedIn ? (
          'User'
        ) : (
          <>
            <p>
              This is a simple task manager. To start to work with the maneger
              log in with link below and let's see what have to be done today!
            </p>
            <a href={requestUrl}>Login with Trello account</a>
          </>
        )}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        {this.isLoggedIn ? 'Main content' : 'Please login with Trello Acc'}
      </main>
    );
  }

  public componentDidMount() {
    // let savedToken = await this.getToken();
    let newToken = this.getTokenFromUrl();

    // this.setToken(newToken || savedToken);
    this.setToken(newToken);
  }

  public render() {
    return <div>{this.renderHeader()}</div>;
  }
}
