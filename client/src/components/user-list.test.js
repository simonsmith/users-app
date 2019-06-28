import React, {useEffect} from 'react';
import {shallow} from 'enzyme';
import {UserList} from './user-list';
import {useShallowEqualSelector} from '../util/use-shallow-equal-selector';

jest.mock('../util/use-shallow-equal-selector');
jest.mock('react-redux');
jest.mock('../store/users', () => ({
  ...jest.requireActual('../store/users'),
  requestAllUsers: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

test('renders users from the store', () => {
  useShallowEqualSelector
    .mockReturnValueOnce({
      entities: {
        123: {
          name: 'foo',
          role: 111,
        },
        456: {
          name: 'baz',
          role: 111,
        },
      },
      result: ['123', '456'],
    })
    .mockReturnValueOnce({
      entities: {
        111: {
          foo: 'bar',
        },
      },
    });
  expect(shallow(<UserList />)).toMatchSnapshot();
  expect(useEffect).toHaveBeenCalled();
});
