import React, { ReactElement, Component } from 'react';
import { IRouteChildrenProps } from '../App/Routes';

export class DashBoard extends Component<IRouteChildrenProps> {
  private goBack = (): void => {
    this.props.history.goBack();
  };

  render(): ReactElement {
    return <p onClick={this.goBack}>DashBoard</p>;
  }
}
