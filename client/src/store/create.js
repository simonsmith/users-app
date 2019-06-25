import {configureStore} from 'redux-starter-kit';
import {usersReducer as users} from './users';
import {entitiesReducer as entities} from './entities';
import {loadingReducer as loading} from './loading';
import {errorReducer as error} from './error';
import apiMiddleware from './middleware/api';

export default function() {
  return configureStore({
    reducer: {
      entities,
      users,
      loading,
      error,
    },
    middleware: [apiMiddleware],
  });
}
