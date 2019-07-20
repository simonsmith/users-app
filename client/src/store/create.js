import {configureStore} from 'redux-starter-kit';
import {createApiMiddleware} from '@simonsmith/redux-api-middleware';
import axios from 'axios';
import {usersReducer as users} from './users';
import {entitiesReducer as entities} from './entities';
import {loadingReducer as loading} from './loading';
import {errorReducer as error} from './error';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/';

export default function() {
  return configureStore({
    reducer: {
      entities,
      users,
      loading,
      error,
    },
    middleware: [
      createApiMiddleware(axios, {
        requestDefaults: {
          baseURL: BASE_URL,
        },
      }),
    ],
  });
}
