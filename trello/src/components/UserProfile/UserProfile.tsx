import React, { ReactElement } from 'react';
import { FunctionComponent } from 'react';

import { IRouteChildrenProps } from '../Routes';

import style from './UserProfile.module.scss';

export interface IUserProfile {
  id: string;
  fullName: string;
  email: string;
  url: string;
}

interface IUserFields {
  id: string;
  labelText: string;
  inputText: string;
  editable?: boolean;
  link?: boolean;
}

function renderItem(item: IUserFields): ReactElement {
  if (item.editable) {
    return (
      <>
        <input
          id={item.id}
          className={style.input}
          type='text'
          disabled
          defaultValue={item.inputText}
        />
        <button className={`ui-button ${style['ui-button']}`} />
      </>
    );
  }

  if (item.link) {
    return (
      <a
        className={style.input}
        href={item.inputText}
        target='_blank'
        rel='noopener noreferrer'
      >
        {item.inputText}
      </a>
    );
  }

  return <span className={style.input}>{item.inputText}</span>;
}

export const UserProfile: FunctionComponent<IRouteChildrenProps> = ({
  userProfile
}) => {
  // console.info(userProfile);

  if (!userProfile) {
    return <p>Nothing to render</p>;
  }

  let { id, fullName, email, url } = userProfile;

  let fields: Array<IUserFields> = [
    {
      id: 'user-id',
      labelText: 'User ID',
      inputText: id
    },
    {
      id: 'user-name',
      labelText: 'Full Name',
      inputText: fullName,
      editable: true
    },
    {
      id: 'user-email',
      labelText: 'Email',
      inputText: email,
      editable: true
    },
    {
      id: 'user-url',
      labelText: 'Url',
      inputText: url,
      link: true
    }
  ];

  return (
    <form action='' className={style.form}>
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>User Profile</legend>
        {fields.map(function(item, index): ReactElement {
          return (
            <div key={index} className={style.field}>
              <label className={style.label} htmlFor={item.id}>
                {item.labelText}
              </label>
              {renderItem(item)}
            </div>
          );
        })}
      </fieldset>
    </form>
  );
};
