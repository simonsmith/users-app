import {createReducer} from 'redux-starter-kit';

const initialState = {
  isLoading: false,
  result: [],
  error: null,
};

export default createReducer(initialState, {
  USERS_REQUEST: state => {
    state.isLoading = true;
  },
  USERS_GET_SUCCESS: (state, action) => {
    state.isLoading = false;
    state.result = action.payload.result;
  },
  USERS_FAILURE: (state, action) => {
    state.isLoading = false;
    if (action.error) {
      state.error = action.payload;
    }
  },
});
