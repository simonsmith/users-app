import entitiesReducer from './entities';

test('should handle no state being passed', () => {
  expect(entitiesReducer(undefined, {})).toMatchSnapshot();
});

test('should merge the object into the state when the action payload contains an entities property', () => {
  const action = {
    payload: {
      entities: {
        users: {
          123: {name: 'bar'},
          456: {name: 'foo'},
        },
      },
    },
  };
  const beforeState = {
    users: {
      789: {name: 'baz'},
    },
    other: {foo: 'bar'},
  };
  const afterState = entitiesReducer(beforeState, action);

  expect(afterState).toMatchSnapshot();
  expect(afterState).not.toBe(beforeState);
});
