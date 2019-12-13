import React, { FunctionComponent } from 'react';
import { RouteChildrenProps, Redirect } from 'react-router-dom';

interface IOAuthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void;
}

export const OAuth: FunctionComponent<IOAuthProps> = ({
  location: { hash },
  onSetToken
}: IOAuthProps) => {
  const token = hash.split('=')[1];

  onSetToken(token);
  return <Redirect to='/dashBoard' />;
};
