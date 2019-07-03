import React from 'react';
import {createNewUser} from '../store/users';
import {UserEditForm} from './user-edit-form';

export function CreateUser({roleEntities}) {
  const initialInputValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    role: '',
  };
  const onSubmit = (dispatch, user) => {
    return dispatch(createNewUser(user));
  };
  return (
    <UserEditForm
      legendText="Create a new user"
      buttonText="Create"
      initialInputValues={initialInputValues}
      onSubmit={onSubmit}
      roleEntities={roleEntities}
      clearOnSubmit
    />
  );
}
