import React, { FunctionComponent } from 'react';
import { RouteChildrenProps, Redirect } from 'react-router-dom';
import { URLS } from '../Routes';
import { connect } from 'react-redux';
import { setToken } from '../../store/oauth';
// import { IAppState } from '../../store';

interface IOAuthProps extends RouteChildrenProps {
  onSetToken?: (token: string) => void;
}

const OAuth: FunctionComponent<IOAuthProps> = ({
  location: { hash },
  onSetToken
}: IOAuthProps) => {
  const token = hash.split('=')[1];

  if (token) {
    onSetToken && onSetToken(token);
    return <Redirect to={URLS.DASH_BOARD} />;
  }

  return <Redirect to={URLS.LOGIN} />;
};

const mapStateToProps = (/* state: IAppState */) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetToken: (token: string) => dispatch(setToken(token))
  };
};

const connectedOAuth = connect(mapStateToProps, mapDispatchToProps)(OAuth);

export { connectedOAuth as OAuth };
