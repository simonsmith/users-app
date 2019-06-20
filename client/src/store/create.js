import {configureStore} from 'redux-starter-kit';
import users from './reducers/users';
import entities from './reducers/entities';

export default function() {
  return configureStore({
    reducer: {
      entities,
      users,
    },
    middleware: [],
  });
}
