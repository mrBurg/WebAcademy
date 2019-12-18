import React, { ReactElement, Component } from 'react';

// import style from './DashBoard.module.scss';

import { IRouteChildrenProps } from '../Routes';
import { connect } from 'react-redux';
import { IAppReducerState, increaseCount, decreaseCount } from '../../store';

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

  /* private showBoards(board: IBoard, index: number): ReactElement {
    let { id, name, pinned } = board;

    return (
      <tr key={index}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{pinned ? 'pinned' : 'nopinned'}</td>
      </tr>
    );
  } */

  render(): ReactElement {
    // let { boards } = this.props;

    // console.info(boards);

    /* if (!boards) {
      return <p onClick={this.goBack}>Nothing to render</p>;
    } */

    return (
      <div>
        <h2 onClick={this.goBack}>Hello</h2>
        <div>{this.props.count}</div>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </div>
    );
  }
}

/*<table cellPadding='0' cellSpacing='0' className={style.table}>
        <tbody>{boards.map(this.showBoards)}</tbody>
      </table>*/
const mapStateToProps = (state: IAppReducerState) => {
  return {
    count: state.count
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount),
    onDecrease: () => dispatch(decreaseCount)
  };
};

const connectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);

export { connectedDashBoard as DashBoard };
