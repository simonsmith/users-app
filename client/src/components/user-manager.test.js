import axios from 'axios';
import React from 'react';
import {cleanup} from '@testing-library/react';
import {renderWithStore} from '../test-util/render-with-store';
import {UserManager} from './user-manager';

afterEach(cleanup);

jest.mock('axios');

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

test('renders a list of users from the store', async () => {
  axios.mockResolvedValue({data: response});
  const {findAllByText} = renderWithStore(<UserManager />);
  const userElements = await findAllByText('foo.com');
  expect(userElements).toHaveLength(2);
});
