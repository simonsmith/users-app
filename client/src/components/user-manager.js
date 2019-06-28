import React, {useEffect} from 'react';
import {selectUsers, selectRoles, requestAllUsers} from '../store/users';
import {UserList} from './user-list';
import {CreateUser} from './create-user';
import {useDispatch} from 'react-redux';
import {useShallowEqualSelector} from '../util/use-shallow-equal-selector';

export function UserManager() {
  const {entities: userEntities, result: userIds} = useShallowEqualSelector(
    selectUsers
  );
  const {entities: roleEntities} = useShallowEqualSelector(selectRoles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAllUsers());
  }, [dispatch]);

  return (
    <div>
      <CreateUser roleEntities={roleEntities} />
      <UserList
        userIds={userIds}
        userEntities={userEntities}
        roleEntities={roleEntities}
      />
    </div>
  );
}
