import {errorReducer} from './error';

describe('reducer', () => {
  test('handle no state being passed', () => {
    expect(errorReducer(undefined, {})).toEqual({
      message: null,
      request: null,
    });
  });

  test('stores the error and response', () => {
    const error = new Error('oh no');
    error.response = {
      foo: 'bar',
    };
    const afterState = errorReducer(undefined, {
      payload: error,
      type: 'API_REQUEST_FAILURE',
    });

    expect(afterState).toMatchSnapshot();
  });
});
