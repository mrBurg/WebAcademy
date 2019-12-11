import React from 'react';
import { Route, Redirect, Router, RouteProps } from 'react-router';

interface IPrivateRouteProps extends RouteProps {}

export function PrivateRout() {
  return <Route render={() => <Redirect to="/" />} />;
}
