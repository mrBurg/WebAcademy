import React, { ReactElement } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router-dom';

import { Login } from '../Login';
import { DashBoard } from '../DashBoard';
import { UserProfile, IUserProfile } from '../UserProfile';
import { NotFound } from '../NotFound';
// import { OAuth } from "../OAuth";

import { IBoard } from '../App/App';

export interface IRouteChildrenProps extends RouteChildrenProps {
  token?: string | null;
  profile?: IUserProfile | null;
  boards?: Array<IBoard> | null;
}

export interface IAppRoute {
  path: URLS;
  render: (props: IRouteChildrenProps) => ReactElement;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
  isProtected?: boolean;
}

export enum URLS {
  HOME = '/',
  LOGIN = '/login',
  DASH_BOARD = '/dashboard',
  USER_PROFILE = '/profile',
  NOT_FOUND = '/404',
  OAUTH = '/oauth'
}

export const routes: Array<IAppRoute> = [
  {
    path: URLS.DASH_BOARD,
    render: props => <DashBoard {...props} />,
    title: 'DashBoard',
    isProtected: true
  },
  {
    path: URLS.USER_PROFILE,
    render: props => <UserProfile {...props} />,
    title: 'Profile',
    isProtected: true
  },
  {
    path: URLS.LOGIN,
    render: props => <Login {...props} />,
    title: 'login'
  },
  {
    path: URLS.NOT_FOUND,
    render: (props: IRouteChildrenProps) => <NotFound {...props} />,
    isHidden: true
  },
  {
    path: URLS.HOME,
    exact: true,
    render: () => <Redirect to={URLS.LOGIN} />,
    isHidden: true
  }
];
