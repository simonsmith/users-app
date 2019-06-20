import {makeApiRequest} from '../middleware/api';

const URL = 'http://localhost:5000/users';

export function requestAllUsers() {
  return makeApiRequest({
    url: URL,
    type: 'USERS',
  });
}
