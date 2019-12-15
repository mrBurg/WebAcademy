import React from 'react';
import { FunctionComponent } from 'react';
import { IRouteChildrenProps } from '../App/Routes';

import style from './UserProfile.module.scss';

export const UserProfile: FunctionComponent<IRouteChildrenProps> = props => {
  let { profile } = props;

  if (!profile) {
    return <p>Nothing to render</p>;
  }

  let { id, fullName, email, url } = profile;

  return (
    <form action='' className={style.form}>
      <fieldset>
        <legend>User Profile</legend>
        <label htmlFor=''>User</label>
        <div>{id}</div>
        <label htmlFor=''>Full Name</label>
        <div>{fullName}</div>
        <label htmlFor=''>Email</label>
        <div>{email}</div>
        <label htmlFor=''>Url</label>
        <div>{url}</div>
      </fieldset>
    </form>
  );
};
