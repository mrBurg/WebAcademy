import React, { Component } from "react";
import moment from "moment";

import Scoreboard from "./view/Scoreboard";

let count = 0;

export default class Clock extends Component {
  clockTypes = ["digital", "digitalShort", "date", "fullDate"];

  state = {
    digital: moment().format("LTS"),
    digitalShort: moment().format("LT"),
    date: moment().format("L"),
    fullDate: moment().format("LL"),
    scoreboardType: this.clockTypes[count]
  };

  componentDidMount() {
    document.addEventListener("click", event => {
      count = count < this.clockTypes.length - 1 ? count + 1 : 0;

      this.setState({ scoreboardType: this.clockTypes[count] });
    });

    setInterval(() => {
      this.setState({
        digital: moment().format("LTS"),
        digitalShort: moment().format("LT")
      });
    }, 1000);
  }

  render() {
    return (
      <Scoreboard
        data={this.state[this.state.scoreboardType]}
        style={this.state.scoreboardType}
      />
    );
  }
}
