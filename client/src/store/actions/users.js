import {normalize, schema} from 'normalizr';
import {makeApiRequest} from '../middleware/api';

const URL = 'http://localhost:5000/users';

const role = new schema.Entity('role');
const user = new schema.Entity('users', {
  role,
});

export function requestAllUsers() {
  return makeApiRequest({
    url: URL,
    type: 'USERS',
    transformer(data) {
      return normalize(data, [user]);
    },
  });
}
