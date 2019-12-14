import React, { FunctionComponent } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';
import { URLS } from '../App/Routes';

interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
  render,
  isAuthenticated,
  ...rest
}: IProtectedRouteProps) => {
  return (
    <Route
      {...rest}
      render={(routeComponentProps: RouteComponentProps) =>
        isAuthenticated ? (
          render!(routeComponentProps)
        ) : (
          <Redirect
            to={{
              pathname: URLS.LOGIN
              // state: { routeComponentProps: location }
            }}
          />
        )
      }
    />
  );
};
