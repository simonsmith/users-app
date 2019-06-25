import {
  requestAllUsers,
  createNewUser,
  usersReducer,
  FETCH_USERS_SUCCESS,
} from './users';
import {apiRequest} from './middleware/api';

jest.mock('./middleware/api');

describe('requestAllUsers action creator', () => {
  test('calls apiRequest with the correct arguments', () => {
    requestAllUsers();
    expect(apiRequest).toHaveBeenCalledWith('/users', 'FETCH_USERS', {
      onSuccess: expect.any(Function),
    });
  });

  test('transforms data with normalizr', () => {
    const data = [
      {id: '123', name: 'foo', role: {id: '999', title: 'hr'}},
      {id: '456', name: 'bar', role: {id: '888', title: 'hr'}},
      {id: '789', name: 'baz', role: {id: '777', title: 'cleaner'}},
    ];
    requestAllUsers();
    const {onSuccess} = apiRequest.mock.calls[0][2];
    expect(onSuccess({data})).toMatchSnapshot();
  });
});

describe('createNewUser action creator', () => {
  test('calls apiRequest with the correct arguments', () => {
    createNewUser({name: 'simon', email: 'me@foo.com'});
    expect(apiRequest).toHaveBeenCalledWith('/users', 'CREATE_USER', {
      onSuccess: expect.any(Function),
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
