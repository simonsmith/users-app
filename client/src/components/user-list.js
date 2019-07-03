import React from 'react';
import {User} from './user';

export function UserList({userIds, userEntities, roleEntities}) {
  return (
    <ul>
      {userIds.map(userId => {
        const userData = userEntities[userId];
        return (
          <li key={userId}>
            <User {...userData} roleEntities={roleEntities} />
          </li>
        );
      })}
    </ul>
  );
}
