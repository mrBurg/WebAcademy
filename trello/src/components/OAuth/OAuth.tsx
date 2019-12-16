import React, { FunctionComponent } from 'react';
import { RouteChildrenProps, Redirect } from 'react-router-dom';
import { URLS } from '../Routes';

interface IOAuthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void;
}

export const OAuth: FunctionComponent<IOAuthProps> = ({
  location: { hash },
  onSetToken
}: IOAuthProps) => {
  const token = hash.split('=')[1];

  if (token) {
    onSetToken(token);
    return <Redirect to={URLS.DASH_BOARD} />;
  }

  return <Redirect to={URLS.LOGIN} />;
};
