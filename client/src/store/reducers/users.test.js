import usersReducer from './users';

test('should handle no state being passed', () => {
  expect(usersReducer(undefined, {})).toMatchSnapshot();
});

test('handles request action', () => {
  const beforeState = {
    isLoading: false,
  };
  const afterState = usersReducer(beforeState, {type: 'USERS_REQUEST'});

  expect(afterState).toEqual({
    isLoading: true,
  });
});

test('handles success action', () => {
  const beforeState = {
    isLoading: true,
  };
  const afterState = usersReducer(beforeState, {
    type: 'USERS_GET_SUCCESS',
    payload: {result: [1, 2, 3]},
  });

  expect(afterState).toEqual({
    isLoading: false,
    result: [1, 2, 3],
  });
});

test('handles failure action', () => {
  const beforeState = {
    isLoading: true,
    error: null,
  };
  const afterState = usersReducer(beforeState, {
    type: 'USERS_FAILURE',
    error: true,
    payload: new Error('fail'),
  });

  expect(afterState).toMatchSnapshot();
});
