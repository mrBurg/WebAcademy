import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';

export function NotFound(props: RouteChildrenProps) {
  console.info(props);
  return <h1>404 NotFound</h1>;
}
