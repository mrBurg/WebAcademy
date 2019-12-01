import React, { Component } from 'react';

import Digital from './view/Digital';

export default class Clock extends Component {
  state = {
    date: new Date()
  }

  constructor(props) {
    super(props)

    setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000);
  }

  render() {
    return <Digital time={this.state.date.toTimeString()} />;
  }
}