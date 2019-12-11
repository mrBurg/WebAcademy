import React from 'react';

import { Login } from '../Login';
import { DashBoard } from '../DashBoard';
import { Redirect } from 'react-router';

export interface IAppRoute {
  path: string;
  render: (props: any) => any;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
}

export const routes: Array<IAppRoute> = [
  {
    path: '/login',
    render: (props: any) => <Login {...props} />,
    title: 'login'
  },
  {
    path: '/DashBoard',
    render: (props: any) => <DashBoard {...props} />,
    title: 'DashBoard'
  },
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/login" />,
    isHidden: true
  }
];
