import React, { ReactElement, Component } from 'react';

import style from './DashBoard.module.scss';

import { IRouteChildrenProps } from '../Routes';
import { connect } from 'react-redux';
import { IAppState } from '../../store';

export interface IBoard {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface IDashBoardProps extends IRouteChildrenProps {}

class DashBoard extends Component<IDashBoardProps> {
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
    // let { boards } = this.props;

    // console.info(boards);

    /* if (!boards) {
      return <p onClick={this.goBack}>Nothing to render</p>;
    } */

    return (
      <table cellPadding='0' cellSpacing='0' className={style.table}>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const connectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);

export { connectedDashBoard as DashBoard };
