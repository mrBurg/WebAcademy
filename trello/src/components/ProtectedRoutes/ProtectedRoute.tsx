import React, { FunctionComponent } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';
import { connect } from 'react-redux';

import { URLS } from '../Routes';
import { IAppState, isAuthenticated } from '../../store';

interface IProtectedRouteProps extends RouteProps {
  isAuthenticated?: boolean;
}

const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
  render,
  isAuthenticated
}: IProtectedRouteProps) => {
  return (
    <Route
      render={(props: RouteComponentProps) =>
        isAuthenticated ? (
          render!({ ...props })
        ) : (
          <Redirect
            to={{
              pathname: URLS.LOGIN
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    isAuthenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const ConnectedProtectedRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);

export { ConnectedProtectedRoute as ProtectedRoute };
