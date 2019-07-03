import React from 'react';
import 'jest-dom/extend-expect';
import {cleanup, render, fireEvent} from '@testing-library/react';
import {User} from './user';
import {configureStore} from 'redux-starter-kit';
import {renderWithStore} from '../test-util/render-with-store';
import {updateSingleUser} from '../store/users';

afterEach(cleanup);
jest.mock('../store/users');

const user = {
  name: 'foo',
  id: '123345',
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

const renderUser = () => render(<User {...user} roleEntities={roleEntities} />);
const renderUserWithStore = () => {
  const middleware = () => () => () => {
    return Promise.resolve();
  };
  const store = configureStore({
    reducer: state => state,
    middleware: [middleware],
  });
  return renderWithStore(<User {...user} roleEntities={roleEntities} />, store);
};
const clickEditAndGetInputValue = label => {
  const {queryByText, queryByLabelText} = renderUserWithStore();
  fireEvent.click(queryByText('Edit user'));
  return queryByLabelText(label);
};

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

  test('changes button text when clicking edit', () => {
    const {queryByText} = renderUserWithStore();
    fireEvent.click(queryByText('Edit user'));
    expect(queryByText('Cancel edit')).toBeInTheDocument();
  });

  test('renders name as an input', () => {
    expect(clickEditAndGetInputValue('Name')).toHaveValue('foo');
  });

  test('renders username as an input', () => {
    expect(clickEditAndGetInputValue('Username')).toHaveValue('fooer');
  });

  test('renders website as an input', () => {
    expect(clickEditAndGetInputValue('Website')).toHaveValue('foo.com');
  });

  test('renders email as an input', () => {
    expect(clickEditAndGetInputValue('Email')).toHaveValue('me@test.com');
  });

  test('renders role as a select', () => {
    expect(clickEditAndGetInputValue('Select a role')).toHaveValue('1');
  });
});

describe('submitting the form', () => {
  test('calls the update user action and switches back to user display', async () => {
    updateSingleUser.mockReturnValue({type: 'bar'});
    const {queryByText, findByText} = renderUserWithStore();
    fireEvent.click(queryByText('Edit user'));

    const btn = await findByText('Save changes to foo');
    fireEvent.click(btn);

    const editBtn = await findByText('Edit user');
    const name = queryByText('foo');

    expect(editBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(updateSingleUser.mock.calls).toMatchSnapshot();
  });
});
