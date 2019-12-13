import React, { ReactElement } from 'react';

import { Login } from '../Login';
import { DashBoard } from '../DashBoard';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { NotFound } from '../NotFound';
// import { OAuth } from "../OAuth";

export interface IRouteChildrenProps extends RouteChildrenProps {
  token: string;
}

export interface IAppRoute {
  path: string;
  render: (props: IRouteChildrenProps) => ReactElement;
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
  // path: "/oauth",
  // render: (props: RouteChildrenProps) => <OAuth {...props} />,
  // isHidden: true
  // },
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/login' />,
    isHidden: true
  },
  {
    path: '/404',
    render: (props: IRouteChildrenProps) => <NotFound {...props} />,
    isHidden: true
  }
];
