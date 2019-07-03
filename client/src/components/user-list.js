import React from 'react';
import {User} from './user';

export function UserList({userIds, userEntities, roleEntities}) {
  if (!userIds.length) {
    return null;
  }
  return (
    <ul data-testid="user-list">
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
