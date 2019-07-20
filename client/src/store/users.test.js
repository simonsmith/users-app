import {
  requestAllUsers,
  createNewUser,
  updateSingleUser,
  usersReducer,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  UPDATE_USER,
  FETCH_USERS,
} from './users';
import {apiRequest} from '@simonsmith/redux-api-middleware';

jest.mock('@simonsmith/redux-api-middleware');

describe('requestAllUsers action creator', () => {
  test('calls apiRequest with the correct arguments', () => {
    requestAllUsers();
    expect(apiRequest).toHaveBeenCalledWith('/users', {
      onSuccess: expect.any(Function),
      type: FETCH_USERS,
    });
  });

  test('transforms data with normalizr', () => {
    const data = [
      {id: '123', name: 'foo', role: {id: '999', title: 'hr'}},
      {id: '456', name: 'bar', role: {id: '888', title: 'hr'}},
      {id: '789', name: 'baz', role: {id: '777', title: 'cleaner'}},
    ];
    requestAllUsers();
    const {onSuccess} = apiRequest.mock.calls[0][1];
    expect(onSuccess({data})).toMatchSnapshot();
  });
});

describe('updateSingleUser action creator', () => {
  test('calls apiRequest with the correct arguments', () => {
    updateSingleUser('123', {name: 'simon', email: 'me@foo.com'});
    expect(apiRequest).toHaveBeenCalledWith('/users/123', {
      onSuccess: expect.any(Function),
      type: UPDATE_USER,
      method: 'PUT',
      data: {name: 'simon', email: 'me@foo.com'},
    });
  });
});

describe('createNewUser action creator', () => {
  test('calls apiRequest with the correct arguments', () => {
    createNewUser({name: 'simon', email: 'me@foo.com'});
    expect(apiRequest).toHaveBeenCalledWith('/users', {
      onSuccess: expect.any(Function),
      type: CREATE_USER,
      method: 'POST',
      data: {name: 'simon', email: 'me@foo.com'},
    });
  });
});

describe('reducer', () => {
  test('handle no state being passed', () => {
    expect(usersReducer(undefined, {})).toMatchSnapshot();
  });

  test('handles success action', () => {
    const beforeState = {
      result: [],
    };
    const afterState = usersReducer(beforeState, {
      type: FETCH_USERS_SUCCESS,
      payload: {result: [1, 2, 3]},
    });

    expect(afterState).toEqual({
      result: [1, 2, 3],
    });
  });
});
