import React, { Component } from 'react';

import './App.scss';

import { setToLocalStorage, getFromLocalStorage } from '../../utils';

// import { Header } from './Header';

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
    let redirectUrl = 'http://localhost:3000/',
      expiration = '1day',
      appName = 'TRELLO_TOKEN',
      scope = ['read', 'write', 'account'],
      response_type = 'token',
      key = 'dbcd095b73444a442cb438b4d8b5c3fc',
      requestUrl = `https://trello.com/1/authorize
      ?return_url=${redirectUrl}
      &expiration=${expiration}
      &name=${appName}
      &scope=${scope.join(',')}
      &response_type=${response_type}
      &key=${key}`.replace(/[\s\n]/g, '');

    return (
      <header>
        <h2>Welcome!</h2>
        {console.info(this.isLoggedIn)}
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

  public async componentDidMount() {
    // let savedToken = await this.getToken(),
    let newToken = this.getTokenFromUrl();

    // this.setToken(newToken || savedToken);
  }

  public render() {
    return <div>{this.renderHeader()}</div>;
  }
}
