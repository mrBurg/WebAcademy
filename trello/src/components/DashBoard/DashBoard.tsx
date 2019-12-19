import React, { ReactElement, Component } from 'react';

import style from './DashBoard.module.scss';

import { IRouteChildrenProps } from '../Routes';
import { connect } from 'react-redux';
import { IAppState, increaseCount, decreaseCount, getCount } from '../../store';

export interface IBoard {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface IDashBoardProps extends IRouteChildrenProps {
  count?: any;
  onIncrease?(): void;
  onDecrease?(): void;
}

class DashBoard extends Component<IDashBoardProps> {
  private goBack = (): void => {
    this.props.history.goBack();
  };

  private increase = (): void => {
    this.props.onIncrease!();
  };

  private decrease = (): void => {
    this.props.onDecrease!();
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
            <td>
              <button onClick={this.decrease}>-</button>
            </td>
            <td>{this.props.count}</td>
            <td>
              <button onClick={this.increase}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    count: getCount(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount()),
    onDecrease: () => dispatch(decreaseCount())
  };
};

const connectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);

export { connectedDashBoard as DashBoard };
