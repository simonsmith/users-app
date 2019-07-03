import React from 'react';
import 'jest-dom/extend-expect';
import {cleanup, render} from '@testing-library/react';
import {UserList} from './user-list';

afterEach(cleanup);

test('renders a list of users', () => {
  const result = ['1', '2'];
  const userEntities = {
    1: {
      id: '1',
      name: 'foo',
      username: 'fooz',
      role: '444',
    },
    2: {
      id: '2',
      name: 'bar',
      username: 'barz',
      role: '444',
    },
  };
  const roleEntities = {
    444: {
      title: 'Dev',
      id: '444',
    },
  };
  const {queryByText} = render(
    <UserList
      userIds={result}
      userEntities={userEntities}
      roleEntities={roleEntities}
    />
  );
  expect(queryByText('fooz')).toBeInTheDocument();
  expect(queryByText('barz')).toBeInTheDocument();
});

test('does not render a list when no users', () => {
  const {queryByTestId} = render(<UserList userIds={[]} />);
  expect(queryByTestId('user-list')).not.toBeInTheDocument();
});
