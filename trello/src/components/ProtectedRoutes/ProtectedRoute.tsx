import React, { FunctionComponent } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

import { URLS } from '../Routes';

interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
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
