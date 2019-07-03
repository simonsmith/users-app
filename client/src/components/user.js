import React, {useState} from 'react';
import {updateSingleUser} from '../store/users';
import {UserEditForm} from './user-edit-form';

export function User(props) {
  const [isEditing, setEditing] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setEditing(!isEditing);
        }}
      >
        {isEditing ? 'Cancel edit' : 'Edit user'}
      </button>
      {isEditing ? (
        <UserEdit {...props} setEditing={setEditing} />
      ) : (
        <UserDisplay {...props} />
      )}
    </div>
  );
}

function UserDisplay({
  name,
  avatar = 'https://via.placeholder.com/100',
  username,
  website,
  email,
  role,
  roleEntities,
}) {
  const {title} = roleEntities[role];
  return (
    <div>
      <p>{name}</p>
      <img src={avatar} alt={name} />
      <p>{username}</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        <a href={website}>{website}</a>
      </p>
      <p>{title}</p>
    </div>
  );
}

function UserEdit({roleEntities, setEditing, ...restProps}) {
  const initialInputValues = {...restProps};
  const {id, name} = restProps;
  const onSubmit = (dispatch, user) => {
    return dispatch(updateSingleUser(id, user)).then(() => setEditing(false));
  };
  return (
    <UserEditForm
      legendText={`Edit ${name}`}
      buttonText={`Save changes to ${name}`}
      initialInputValues={initialInputValues}
      onSubmit={onSubmit}
      roleEntities={roleEntities}
    />
  );
}
