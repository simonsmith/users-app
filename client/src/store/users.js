import {createReducer} from 'redux-starter-kit';
import {normalize, schema} from 'normalizr';
import {apiRequest} from '@simonsmith/redux-api-middleware';

export const FETCH_USERS = 'FETCH_USERS';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

const role = new schema.Entity('role');
const user = new schema.Entity('users', {
  role,
});

function normalizeUsers({data}) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: normalize(data, [user]),
  };
}

export function updateSingleUser(id, changes = {}) {
  return apiRequest(`/users/${id}`, {
    type: UPDATE_USER,
    onSuccess: requestAllUsers,
    method: 'PUT',
    data: changes,
  });
}

export function createNewUser(user) {
  return apiRequest('/users', {
    type: CREATE_USER,
    onSuccess: requestAllUsers,
    method: 'POST',
    data: user,
  });
}

export function requestAllUsers() {
  return apiRequest('/users', {
    type: FETCH_USERS,
    onSuccess: normalizeUsers,
  });
}

const initialState = {
  result: [],
};

export const usersReducer = createReducer(initialState, {
  [FETCH_USERS_SUCCESS]: (state, action) => {
    state.result = action.payload.result;
  },
});

export function selectUsers(state) {
  return {
    result: state.users.result,
    entities: state.entities.users,
  };
}

export function selectRoles(state) {
  return {
    entities: state.entities.role,
  };
}
