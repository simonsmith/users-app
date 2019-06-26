import React from 'react';
import {selectUsers, selectRoles} from '../store/users';
import {User} from './user';
import {useShallowEqualSelector} from '../util/use-shallow-equal-selector';

export function UserList() {
  const {entities: userEntities, result: userIds} = useShallowEqualSelector(
    selectUsers
  );
  const {entities: roleEntities} = useShallowEqualSelector(selectRoles);

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
