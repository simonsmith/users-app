import {createReducer} from 'redux-starter-kit';
import {normalize, schema} from 'normalizr';
import {apiRequest} from './middleware/api';

export const FETCH_USERS = 'FETCH_USERS';
export const USERS_SUCCESS = 'USERS_SUCCESS';

const role = new schema.Entity('role');
const user = new schema.Entity('users', {
  role,
});

function normalizeUsers({data}) {
  return {
    type: USERS_SUCCESS,
    payload: normalize(data, [user]),
  };
}

export function requestAllUsers() {
  return apiRequest('/users', FETCH_USERS, {
    onSuccess: normalizeUsers,
  });
}

const initialState = {
  result: [],
};

export const usersReducer = createReducer(initialState, {
  USERS_SUCCESS: (state, action) => {
    state.result = action.payload.result;
  },
});
