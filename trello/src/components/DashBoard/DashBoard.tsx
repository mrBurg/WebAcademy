import React, { ReactElement, Component } from 'react';
import { connect } from 'react-redux';

import style from './DashBoard.module.scss';

import { IRouteChildrenProps } from '../Routes';
import { getBoard, IAppState } from '../../store';

export interface IBoard {
  id?: string;
  name?: string;
  pinned?: boolean;
  desc?: string;
}

interface IDashBoardProps extends IRouteChildrenProps {
  dashboard?: any;
  onGetBoard?: any;
}

const INITIAL_STATE: IBoard = {};

class DashBoard extends Component<IDashBoardProps> {
  public state = INITIAL_STATE;
  /* static getDerivedStateFromProps(props: any, state: IAppState): Partial<any> {
    console.info(state);
    let { onGetBoard, dashboard } = props;

    // if (Object.keys(dashboard).length) return {};

    onGetBoard();
    return {};
  } */

  UNSAFE_componentWillMount() {
    let { onGetBoard } = this.props;
    onGetBoard();
  }

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
    // let { dashboard } = this.props;

    console.info(this.props);

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
  // console.info(state.dashboard);
  return {
    dashboard: {}
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetBoard: (): void => dispatch(getBoard())
  };
};

const connectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);

export { connectedDashBoard as DashBoard };
