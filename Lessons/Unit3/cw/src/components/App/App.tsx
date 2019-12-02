import * as React from 'react';
import { setToLocalStorage, getFromLocalStorage } from './../../utils';

const TOKEN_STORAGE_KEY: string = 'dbcd095b73444a442cb438b4d8b5c3fc';

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

export class App extends React.Component<any, AppState> {
  public state: AppState = {
    token: '',
    boards: []
  };

  private async setToken(token: string) {
    this.setState({ token });
    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }

  private async getTokenFromUrl() {
    return window.location.hash.split('=')[1];
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE_KEY);
  }

  public componentDidMount() {
    const token = window.location.hash.split('=')[0];

    if (token) {
      this.setToken(token);
    }
  }

  public render() {
    const redirectUrl: string = 'http://localhost:3000/',
      scope: Array<string> = ['read', 'write', 'account'],
      key: string = '560bf4298b3dda300c18d09c',
      appName: string = 'GROUP_2511_TRELLO_APP',
      requestUrl: string = `https://trello.com/1/authorize?return_url${redirectUrl}&expiration=1day&name=${appName}&scope=${scope.join(
        ','
      )}&response_type=token&key=${key}`;

    return (
      <div>
        <header>
          <a href={requestUrl}>Login with trello account</a>
        </header>
        <h2>Please login</h2>
      </div>
    );
  }
}
