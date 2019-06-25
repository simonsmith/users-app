import {createReducer} from 'redux-starter-kit';

const initialState = {};

export const loadingReducer = createReducer(initialState, {
  API_REQUEST_START: (state, action) => {
    return {
      ...state,
      [action.payload]: true,
    };
  },
  API_REQUEST_END: (state, action) => {
    return {
      ...state,
      [action.payload]: false,
    };
  },
});
