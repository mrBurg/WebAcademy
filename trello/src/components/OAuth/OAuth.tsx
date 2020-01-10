import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';

import { IAppState, getToken } from '../../reduxStore';

interface IOAuthProps extends RouteChildrenProps {
  onGetToken: () => void;
}

const OAuth: FunctionComponent<IOAuthProps> = ({ onGetToken }: IOAuthProps) => {
  onGetToken();
  return null;
};

const mapStateToProps = (state: IAppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetToken: () => dispatch(getToken())
  };
};

const connectedOAuth = connect(mapStateToProps, mapDispatchToProps)(OAuth);

export { connectedOAuth as OAuth };
