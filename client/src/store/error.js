import {createReducer} from 'redux-starter-kit';

const initialState = {
  message: null,
  request: null,
};

export const errorReducer = createReducer(initialState, {
  API_REQUEST_FAILURE: (state, action) => {
    return {
      message: action.payload.toString(),
      response: action.payload.response,
    };
  },
});
