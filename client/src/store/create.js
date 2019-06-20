import {configureStore} from 'redux-starter-kit';
import users from './reducers/users';
import entities from './reducers/entities';
import apiMiddleware from './middleware/api';

export default function() {
  return configureStore({
    reducer: {
      entities,
      users,
    },
    middleware: [apiMiddleware],
  });
}
