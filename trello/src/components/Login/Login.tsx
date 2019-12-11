import React, { ReactElement } from 'react';

import style from './Login.module.scss';
import { RouteChildrenProps } from 'react-router';

interface ILoginProps extends RouteChildrenProps {
  token: string;
}

const {
  REACT_APP_REDIRECT_URL,
  REACT_APP_EXPIRATION,
  REACT_APP_NAME,
  REACT_APP_SCOPE,
  REACT_APP_RESPONSE_TYPE,
  REACT_APP_KEY
} = process.env;

export function Login(props: ILoginProps): ReactElement {
  console.info(props);

  let redirectUrl = REACT_APP_REDIRECT_URL,
    expiration = REACT_APP_EXPIRATION,
    appName = REACT_APP_NAME,
    scope = REACT_APP_SCOPE,
    response_type = REACT_APP_RESPONSE_TYPE,
    key = REACT_APP_KEY,
    requestUrl = `https://trello.com/1/authorize
      ?return_url=${redirectUrl}
      &expiration=${expiration}
      &name=${appName}
      &scope=${scope}
      &response_type=${response_type}
      &key=${key}`.replace(/[\s\n]/g, '');

  return (
    <div className={style.content}>
      <h1 className={style.welcome}>Welcome!</h1>
      <p className={style.text}>
        This is a simple task manager. To start to work with the maneger log in
        with link below and let's see what have to be done today!
      </p>
      <div className={style.button}>
        <a href={requestUrl} className={style.button_link}>
          Login with Trello account
        </a>
      </div>
    </div>
  );
}
