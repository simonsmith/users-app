import {requestAllUsers, usersReducer, FETCH_USERS_SUCCESS} from './users';
import {apiRequest} from './middleware/api';

jest.mock('./middleware/api');

describe('actions', () => {
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
