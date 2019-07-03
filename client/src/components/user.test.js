import React from 'react';
import 'jest-dom/extend-expect';
import {cleanup, render, fireEvent} from '@testing-library/react';
import {User} from './user';

afterEach(cleanup);

const user = {
  name: 'foo',
  avatar: 'avatar.png',
  username: 'fooer',
  website: 'foo.com',
  email: 'me@test.com',
  role: '1',
};
const roleEntities = {
  1: {
    title: 'developer',
  },
};

function renderUser() {
  return render(<User {...user} roleEntities={roleEntities} />);
}

describe('displaying user', () => {
  test('renders name', () => {
    const {queryByText} = renderUser();
    expect(queryByText('foo')).toBeInTheDocument();
  });

  test('renders username', () => {
    const {queryByText} = renderUser();
    expect(queryByText('fooer')).toBeInTheDocument();
  });

  test('renders website', () => {
    const {queryByText} = renderUser();
    expect(queryByText('foo.com')).toBeInTheDocument();
  });

  test('renders email', () => {
    const {queryByText} = renderUser();
    expect(queryByText('me@test.com')).toBeInTheDocument();
  });

  test('renders role', () => {
    const {queryByText} = renderUser();
    expect(queryByText('developer')).toBeInTheDocument();
  });

  test('renders avatar', () => {
    const {queryByAltText} = renderUser();
    expect(queryByAltText('foo')).toBeInTheDocument();
  });
});

describe('editing a user', () => {
  test('renders an edit button', () => {
    const {queryByText} = renderUser();
    expect(queryByText('Edit user')).toBeInTheDocument();
  });
});
