import React from 'react';
import axios from 'axios';
import 'jest-dom/extend-expect';
import {cleanup} from '@testing-library/react';
import {renderWithStore} from '../test-util/render-with-store';
import createStore from '../store/create';
import {UserManager} from './user-manager';

jest.mock('axios');

afterEach(cleanup);

const response = [
  {
    id: '123',
    name: 'John Smith',
    avatar: 'avatar.com',
    username: 'user1',
    email: 'test@test.com',
    phone: '123123',
    website: 'foo.com',
    role: {
      id: '111',
      title: 'Developer',
    },
  },
  {
    id: '456',
    name: 'Ted Foo',
    avatar: 'avatar.com',
    username: 'user2',
    email: 'test@test.com',
    phone: '123123',
    website: 'foo.com',
    role: {
      id: '111',
      title: 'Developer',
    },
  },
];

test('initally renders just a create user form and no users', () => {
  const store = createStore();
  axios.mockResolvedValue({data: []});
  const {getByText, queryAllByText} = renderWithStore(<UserManager />, store);
  const formLegend = getByText('Create a new user');
  expect(formLegend).toBeInTheDocument();
  expect(queryAllByText('foo.com')).toHaveLength(0);
});

test('renders a list of users from the store', async () => {
  const store = createStore();
  axios.mockResolvedValue({data: response});
  const {findAllByText} = renderWithStore(<UserManager />, store);
  const userElements = await findAllByText('foo.com');
  expect(userElements).toHaveLength(2);
});
