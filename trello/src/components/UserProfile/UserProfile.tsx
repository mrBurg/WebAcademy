import React from 'react';
import { FunctionComponent } from 'react';
import { RouteChildrenProps } from 'react-router-dom';

interface IUserProfileProps extends RouteChildrenProps {}

export const UserProfile: FunctionComponent<IUserProfileProps> = props => {
  console.info(props);
  return <h2>UserProfile</h2>;
};
