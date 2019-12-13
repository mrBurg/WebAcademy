import React, { ReactElement, Component } from 'react';
import { RouteChildrenProps } from 'react-router-dom';

interface IDashBoardProps extends RouteChildrenProps {
  token?: string;
}

export class DashBoard extends Component<IDashBoardProps> {
  private goBack = (): void => {
    this.props.history.goBack();
  };

  render(): ReactElement {
    return <p onClick={this.goBack}>DashBoard</p>;
  }
}
