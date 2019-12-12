import React, { ReactElement } from 'react';

import { Login } from '../Login';
import { DashBoard } from '../DashBoard';
import {
  Redirect,
  RouteComponentProps,
  RouteChildrenProps
} from 'react-router';
import { NotFound } from '../NotFound';
// import { OAuth } from '../OAuth';

interface IRouteComponentProps extends RouteComponentProps, RouteChildrenProps {
  token: string;
}

export interface IAppRoute {
  path: string;
  render: (props: IRouteComponentProps) => ReactElement;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
}

export const routes: Array<IAppRoute> = [
  {
    path: '/login',
    render: props => <Login {...props} />,
    title: 'login'
  },
  {
    path: '/dashBoard',
    render: props => <DashBoard {...props} />,
    title: 'DashBoard'
  },
  // {
  //   path: '/oauth',
  //   render: (props: RouteChildrenProps) => <OAuth {...props} />,
  //   isHidden: true
  // },
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/login' />,
    isHidden: true
  },
  {
    path: '/404',
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
    isHidden: true
  }
];
