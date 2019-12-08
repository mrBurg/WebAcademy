import * as React from 'react';
import './App.scss';

export class App extends React.Component {
  public render() {
    return (
      <div>
        {/* <Header /> */}
        <header>
          <a href='/'>Login with Trello Account</a>
        </header>
        <h2>Please Login</h2>
      </div>
    );
  }
}
