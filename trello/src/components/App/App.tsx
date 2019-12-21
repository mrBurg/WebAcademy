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
import { init } from '../../store/initialization';

interface IAppProps extends RouteComponentProps {
  onInit: () => void;
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

  public UNSAFE_componentWillMount(): void {
    let { onInit } = this.props;

    onInit();
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
    onInit: () => {
      dispatch(init());
    }
  };
};

const AppWithRouter: ComponentClass = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export { AppWithRouter as App };
