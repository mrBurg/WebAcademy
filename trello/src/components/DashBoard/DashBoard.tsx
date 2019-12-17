import React, { ReactElement, Component } from 'react';
import { IRouteChildrenProps } from '../Routes';

import style from './DashBoard.module.scss';

export interface IBoard {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

export class DashBoard extends Component<IRouteChildrenProps> {
  private goBack = (): void => {
    this.props.history.goBack();
  };

  private showBoards(board: IBoard, index: number): ReactElement {
    let { id, name, pinned } = board;

    return (
      <tr key={index}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{pinned ? 'pinned' : 'nopinned'}</td>
      </tr>
    );
  }

  render(): ReactElement {
    let { boards } = this.props;

    console.info(boards);

    if (!boards) {
      return <p onClick={this.goBack}>Nothing to render</p>;
    }

    return (
      <table cellPadding='0' cellSpacing='0' className={style.table}>
        <tbody>{boards.map(this.showBoards)}</tbody>
      </table>
    );
  }
}
