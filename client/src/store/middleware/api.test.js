import axios from 'axios';
import apiMiddleware, {apiRequest} from './api';
import configureMockStore from 'redux-mock-store';

jest.mock('axios');

const mockStore = configureMockStore([apiMiddleware]);

afterEach(() => {
  axios.mockClear();
});

test('ignores actions that do not match the correct API format', () => {
  const store = mockStore({});
  store.dispatch({type: 'FOO'});
  expect(store.getActions()).toEqual([{type: 'FOO'}]);
});

test('dispatches the result of onSuccess when request is successful', async () => {
  axios.mockResolvedValue('done');
  const store = mockStore({});

  const onSuccess = jest.fn().mockImplementation(() => ({
    type: 'SUCCESS',
  }));

  await store.dispatch({
    API: {
      payload: {
        type: 'some-fetch',
        url: 'foo.com',
        onSuccess,
        foo: 'bar',
      },
    },
  });

  expect(axios.mock.calls).toMatchSnapshot();
  expect(onSuccess).toHaveBeenCalledWith('done');
  expect(store.getActions()).toEqual([
    {type: 'API_REQUEST_START', payload: 'some-fetch'},
    {type: 'SUCCESS'},
    {type: 'API_REQUEST_END', payload: 'some-fetch'},
  ]);
});

test('does not dispatch on success if the onSuccess func is absent from payload', async () => {
  axios.mockResolvedValue('done');
  const store = mockStore({});

  await store.dispatch({
    API: {
      payload: {
        type: 'some-fetch',
      },
    },
  });

  expect(store.getActions()).toEqual([
    {type: 'API_REQUEST_START', payload: 'some-fetch'},
    {type: 'API_REQUEST_END', payload: 'some-fetch'},
  ]);
});

test('dispatches the result of onFailure when request is unsuccessful', async () => {
  const error = new Error('fail');
  axios.mockRejectedValue(error);
  const store = mockStore({});

  const onFailure = jest.fn().mockImplementation(() => ({
    type: 'FAIL',
  }));

  await store.dispatch({
    API: {
      payload: {
        type: 'some-fetch',
        onFailure,
      },
    },
  });

  expect(onFailure).toHaveBeenCalledWith(error);
  expect(store.getActions()).toEqual([
    {type: 'API_REQUEST_START', payload: 'some-fetch'},
    {type: 'API_REQUEST_FAILURE', error: true, payload: error},
    {type: 'FAIL'},
    {type: 'API_REQUEST_END', payload: 'some-fetch'},
  ]);
});

test('does not dispatch on failure if the onFailure func is absent from payload', async () => {
  const error = new Error('fail');
  axios.mockRejectedValue(error);
  const store = mockStore({});

  await store.dispatch({
    API: {
      payload: {
        type: 'some-fetch',
      },
    },
  });

  expect(store.getActions()).toEqual([
    {type: 'API_REQUEST_START', payload: 'some-fetch'},
    {type: 'API_REQUEST_FAILURE', error: true, payload: error},
    {type: 'API_REQUEST_END', payload: 'some-fetch'},
  ]);
});

describe('apiRequest action creator', () => {
  test('handles invalid arguments', () => {
    expect(() => {
      apiRequest();
    }).toThrow();
    expect(() => {
      apiRequest(null);
    }).toThrow();
  });

  test('creates a valid API action object', () => {
    expect(
      apiRequest('foo.com', {
        option: 'value',
        type: 'ACTION_TYPE',
        method: 'POST',
      })
    ).toMatchSnapshot();
  });
});
