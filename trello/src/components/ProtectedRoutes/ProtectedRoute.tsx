import React, { FunctionComponent } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

import { IBoard } from './../App/App';

import { URLS } from '../Routes';
import { IUserProfile } from '../UserProfile';

interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  profile?: IUserProfile | null;
  boards?: Array<IBoard> | null;
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
          render!({ ...routeComponentProps, ...rest })
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
