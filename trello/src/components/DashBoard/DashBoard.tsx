import React, { ReactElement, Component } from 'react';
import { IRouteChildrenProps } from '../Routes';

export class DashBoard extends Component<IRouteChildrenProps> {
  private goBack = (): void => {
    this.props.history.goBack();
  };

  render(): ReactElement {
    let { boards } = this.props;

    if (!boards) {
      return <p onClick={this.goBack}>Nothing to render</p>;
    }

    return <p>DashBoard</p>;
  }
}
