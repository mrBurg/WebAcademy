import React, { Component } from "react";
import moment from "moment";

import Scoreboard from "./view/Scoreboard";

export default class Clock extends Component {
  clockTypes = [
    moment().format("LTS"),
    moment().format("L"),
    moment().format("LL")
  ];

  state = {
    clockType: 0
  };

  // state = {
  //   digital: moment().format("LTS"),
  //   date: moment().format("L"),
  //   fullDate: moment().format("LL")
  // };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("click", event => {
      this.setState({
        clockType:
          this.state.clockType < this.clockTypes.length - 1
            ? this.state.clockType + 1
            : 0
      });
    });
  }

  componentWillUpdate(nextProps, nextState) {
    console.info(nextState);
  }

  render() {
    return <Scoreboard data={this.clockTypes[this.state.clockType]} />;
  }
}
