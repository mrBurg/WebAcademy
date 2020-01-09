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
  shortUrl?: string;
}

interface IDashBoardProps extends IRouteChildrenProps {
  dashboard?: any;
  onGetBoard?: any;
}

const INITIAL_STATE: IBoard = {};

class DashBoard extends Component<IDashBoardProps> {
  public state = INITIAL_STATE;
  static getDerivedStateFromProps(
    nextProps: any,
    prevState: any
  ): Partial<any> {
    console.info(nextProps, 'nextProps');
    console.info(prevState, 'prevState');
    let { onGetBoard } = nextProps;

    // if (Object.keys(dashboard).length) return {};

    onGetBoard();
    return {};
  }

  /* UNSAFE_componentWillMount() {
    let { onGetBoard } = this.props;
    onGetBoard();
  } */

  /* UNSAFE_componentWillMount() {
    let { onGetBoard } = this.props;
    onGetBoard();
  } */

  /* componentWillUpdate() {
    console.info('componentWillUpdate');
  } */

  componentDidUpdate() {
    console.info('componentDidUpdate');
  }

  private goBack = (): void => {
    this.props.history.goBack();
  };

  private showBoards(board: IBoard, index: number): ReactElement {
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
  }

  render(): ReactElement {
    let { dashboard } = this.props;

    console.info(this.props);

    /* if (!boards) {
      return <p onClick={this.goBack}>Nothing to render</p>;
    } */

    return (
      <>
        {/* <p onClick={this.goBack}>Nothing to render</p>
        <table cellPadding='0' cellSpacing='0' className={style.table}>
          {<tbody>{dashboard.boards.map(this.showBoards)}</tbody>}
        </table> */}
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    // dashboard: { ...state.dashboard }
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
