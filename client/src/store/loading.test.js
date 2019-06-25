import {loadingReducer} from './loading';

describe('reducer', () => {
  test('handle no state being passed', () => {
    expect(loadingReducer(undefined, {})).toEqual({});
  });

  test('sets current payload as loading on API_REQUEST_START', () => {
    const beforeState = {};
    const afterState = loadingReducer(beforeState, {
      type: 'API_REQUEST_START',
      payload: 'FOO',
    });

    expect(afterState).toEqual({
      FOO: true,
    });
  });

  test('merges with existing state', () => {
    const beforeState = {
      FOO: false,
    };
    const afterState = loadingReducer(beforeState, {
      type: 'API_REQUEST_START',
      payload: 'BAR',
    });

    expect(afterState).toEqual({
      FOO: false,
      BAR: true,
    });
  });

  test('sets current payload as loading on API_REQUEST_END', () => {
    const beforeState = {};
    const afterState = loadingReducer(beforeState, {
      type: 'API_REQUEST_END',
      payload: 'FOO',
    });

    expect(afterState).toEqual({
      FOO: false,
    });
  });

  test('merges with existing state', () => {
    const beforeState = {
      FOO: true,
      BAR: true,
    };
    const afterState = loadingReducer(beforeState, {
      type: 'API_REQUEST_END',
      payload: 'BAR',
    });

    expect(afterState).toEqual({
      FOO: true,
      BAR: false,
    });
  });
});
