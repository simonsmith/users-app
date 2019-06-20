import mergeAll from 'lodash/fp/mergeAll';
import isObject from 'lodash/fp/isObject';
import get from 'lodash/fp/get';
import {createNextState} from 'redux-starter-kit';

const initialState = {
  users: {},
};

export default function entitiesReducer(state = initialState, action) {
  return createNextState(state, draft => {
    const entities = get('payload.entities', action);
    if (isObject(entities)) {
      return mergeAll([draft, entities]);
    }
    return draft;
  });
}
