import React, {useEffect} from 'react';
import {selectUsers, selectRoles, requestAllUsers} from '../store/users';
import {User} from './user';
import {useDispatch} from 'react-redux';
import {useShallowEqualSelector} from '../util/use-shallow-equal-selector';

export function UserList() {
  const {entities: userEntities, result: userIds} = useShallowEqualSelector(
    selectUsers
  );
  const {entities: roleEntities} = useShallowEqualSelector(selectRoles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAllUsers());
  }, [dispatch]);

  return (
    <ul>
      {userIds.map(userId => {
        const userData = userEntities[userId];
        return (
          <li key={userId}>
            <User {...userData} role={roleEntities[userData.role]} />
          </li>
        );
      })}
    </ul>
  );
}
