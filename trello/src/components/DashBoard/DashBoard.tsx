import React, { ReactElement, Component } from 'react';
import { RouteChildrenProps } from 'react-router';

interface IDashBoardProps extends RouteChildrenProps {
  token: string;
}

export class DashBoard extends Component<IDashBoardProps> {
  private goBack(): void {
    this.props.history.goBack();
  }

  render(): ReactElement {
    console.info(this.props);
    return <p onClick={this.goBack.bind(this)}>DashBoard</p>;
  }
}
