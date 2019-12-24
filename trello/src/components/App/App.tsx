import React, { Component, ReactElement, ComponentClass } from 'react';
import {
  Route,
  RouteChildrenProps,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { connect } from 'react-redux';

import style from './App.module.scss';

import { routes, IAppRoute, URLS } from '../Routes';

import { ProtectedRoute } from '../ProtectedRoutes';
import { Header } from './../Header';
import { OAuth } from './../OAuth';
import { IBoard } from '../DashBoard';
import { IUserProfile } from '../UserProfile';
import { initApp } from '../../store/initialization';
import { readToken } from '../../store';

interface IAppProps extends RouteComponentProps {
  onInitApp: () => void;
}

export interface IAppState {
  token?: string;
  boards?: Array<IBoard>;
  userProfile?: IUserProfile;
}

const INITIAL_STATE: IAppState = {
  token: ''
};

class App extends Component<IAppProps, IAppState> {
  public state = INITIAL_STATE;

  static getDerivedStateFromProps(
    props: IAppProps,
    state: IAppState
  ): Partial<any> | null {
    let { onInitApp } = props;

    onInitApp();
    return null;
  }

  private renderRoute = (route: IAppRoute, index: number): ReactElement => {
    let { path, exact, render } = route;

    if (route.isProtected) {
      return (
        <ProtectedRoute key={index} exact={exact} path={path} render={render} />
      );
    } else {
      return (
        <Route
          key={index}
          exact={exact}
          path={path}
          render={(props: RouteChildrenProps): ReactElement =>
            render({ ...props, token: this.state.token })
          }
        />
      );
    }
  };

  public render(): ReactElement {
    return (
      <>
        <Header />
        <main className={style.main}>
          <Switch>
            {routes.map(this.renderRoute)}

            <Route
              path={URLS.OAUTH}
              render={(props: RouteChildrenProps) => <OAuth {...props} />}
            />
            <Redirect to={URLS.NOT_FOUND} />
          </Switch>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitApp: () => {
      dispatch(readToken());
    }
  };
};

const AppWithRouter: ComponentClass = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export { AppWithRouter as App };
