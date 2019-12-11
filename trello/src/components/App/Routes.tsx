import React from 'react';

import { Login } from '../Login';
import { DashBoard } from '../DashBoard';

export const routes = [
  {
    path: '/login',
    exact: true,
    component: <Login />,
    title: 'login'
  },
  {
    path: '/DashBoard',
    exact: true,
    component: <DashBoard />,
    title: 'DashBoard'
  }
];
