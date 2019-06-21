import {requestAllUsers} from './users';
import {makeApiRequest} from '../middleware/api';

jest.mock('../middleware/api');

test('calls makeApiRequest with the correct arguments', () => {
  requestAllUsers();
  expect(makeApiRequest).toMatchSnapshot();
});

test('transforms data with normalizr', () => {
  const data = [
    {id: '123', name: 'foo', role: {id: '999', title: 'hr'}},
    {id: '456', name: 'bar', role: {id: '888', title: 'hr'}},
    {id: '789', name: 'baz', role: {id: '777', title: 'cleaner'}},
  ];
  requestAllUsers();
  const {transformer} = makeApiRequest.mock.calls[0][0];
  expect(transformer(data)).toMatchSnapshot();
});
