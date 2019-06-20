import axios from 'axios';
import apiMiddleware, {makeApiRequest} from './api';
import configureMockStore from 'redux-mock-store';

jest.mock('axios');

const mockStore = configureMockStore([apiMiddleware]);

afterEach(() => {
  axios.mockClear();
});

test("ignores actions that do not match 'API_REQUEST'", () => {
  const store = mockStore({});
  store.dispatch({type: 'FOO'});
  expect(store.getActions()).toEqual([{type: 'FOO'}]);
});

test('handles http success and dispatches actions with data as the payload', async () => {
  axios.mockResolvedValue({
    data: 'some data',
  });
  const store = mockStore({});

  await store.dispatch({
    API_REQUEST: {
      type: 'TEST',
      meta: {
        url: 'http://foo.com',
        method: 'get',
      },
    },
  });

  expect(axios).toHaveBeenCalledWith({
    url: 'http://foo.com',
    method: 'get',
  });
  expect(store.getActions()).toEqual([
    {type: 'TEST_REQUEST'},
    {type: 'TEST_SUCCESS', payload: 'some data'},
  ]);
});

test('handles http failure and dispatches actions with error as the payload', async () => {
  axios.mockRejectedValue(new Error('api down'));
  const store = mockStore({});
  await store.dispatch({
    API_REQUEST: {
      type: 'TEST',
      meta: {
        url: 'http://foo.com',
      },
    },
  });
  expect(store.getActions()).toEqual([
    {type: 'TEST_REQUEST'},
    {type: 'TEST_FAILURE', error: true, payload: new Error('api down')},
  ]);
});

test('uses optional transformer on data before dispatching', async () => {
  axios.mockResolvedValue({
    data: 'some data',
  });
  const store = mockStore({});
  const transformerMock = jest.fn().mockReturnValue('transformed data');

  await store.dispatch({
    API_REQUEST: {
      type: 'TEST',
      meta: {
        url: 'http://foo.com',
        transformer: transformerMock,
      },
    },
  });

  expect(transformerMock).toHaveBeenCalledWith('some data');
  expect(store.getActions()).toEqual([
    {type: 'TEST_REQUEST'},
    {type: 'TEST_SUCCESS', payload: 'transformed data'},
  ]);
});

test('makeApiRequest returns a correctly formatted API_REQUEST action object', () => {
  expect(
    makeApiRequest({url: 'foo', type: 'FOO', transformer: jest.fn()})
  ).toMatchSnapshot();
});
