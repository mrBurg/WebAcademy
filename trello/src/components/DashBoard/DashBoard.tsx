import React, { ReactElement, Component } from 'react';
import { connect } from 'react-redux';

import style from './DashBoard.module.scss';

import { IRouteChildrenProps } from '../Routes';
import { getBoard, IAppState } from '../../reduxStore';

export interface IBoard {
  id?: string;
  name?: string;
  pinned?: boolean;
  desc?: string;
  shortUrl?: string;
}

interface IDashBoardProps extends IRouteChildrenProps {
  dashboard?: any;
  onGetBoard: any;
}

const INITIAL_STATE: IBoard = {};

class DashBoard extends Component<IDashBoardProps> {
  public state = INITIAL_STATE;

  /* static getDerivedStateFromProps(
    nextProps: any,
    prevState: any
  ): Partial<any> | null {
    console.info('getDerivedStateFromProps');
    console.info(nextProps, 'nextProps');
    console.info(prevState, 'prevState');

    return null;
  } */

  /* getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.info('getSnapshotBeforeUpdate');
    console.info(prevProps, 'nextProps');
    console.info(prevState, 'prevState');

    return null;
  } */

  UNSAFE_componentWillMount() {
    console.info('UNSAFE_componentWillMount');
    let { onGetBoard } = this.props;

    onGetBoard();
  }

  /* componentDidMount() {
    console.info('componentDidMount');
  } */

  /* UNSAFE_componentWillReceiveProps(nextProps: any) {
    console.info('UNSAFE_componentWillReceiveProps');
  } */

  /* UNSAFE_componentWillUpdate() {
    console.info('UNSAFE_componentWillUpdate');
  } */

  /* componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.info('componentDidUpdate');
    console.info(prevProps, 'nextProps');
    console.info(prevState, 'prevState');

    if (snapshot !== null) {
      console.info('snapshot:', snapshot);
    }
  } */

  private goBack = (event: any): void => {
    event.preventDefault();

    this.props.history.goBack();
  };

  private showBoards(boards: Array<IBoard>): ReactElement | null {
    if (!boards.length) return null;

    return (
      <table cellPadding='0' cellSpacing='0' className={style.table}>
        <tbody>
          {boards.map((board, index) => {
            let { id, name, pinned, desc, shortUrl } = board;

            return (
              <tr key={index}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{shortUrl}</td>
                <td>{desc}</td>
                <td>{pinned ? 'pinned' : 'nopinned'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render(): ReactElement {
    let {
      dashboard: { boards }
    } = this.props;

    return (
      <>
        <a href='#back' onClick={this.goBack}>
          &lt;&lt; Back
        </a>
        {this.showBoards(boards)}
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  dashboard: { ...state.dashboard }
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetBoard: (): void => dispatch(getBoard())
});

const connectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);

export { connectedDashBoard as DashBoard };
