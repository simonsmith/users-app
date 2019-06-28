import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/';

function isFunction(f) {
  return typeof f == 'function';
}

function isString(f) {
  return typeof f == 'string';
}

export default function apiMiddleware({dispatch}) {
  return next => action => {
    if (!action.API) {
      return next(action);
    }

    const {
      payload: {type, onSuccess, onFailure, ...restConfig},
    } = action.API;

    if (type) {
      dispatch({
        type: 'API_REQUEST_START',
        payload: type,
      });
    }

    return axios({
      baseURL: BASE_URL,
      ...restConfig,
    })
      .then(
        response => {
          if (isFunction(onSuccess)) {
            dispatch(onSuccess(response));
          }
          return response;
        },
        error => {
          dispatch({type: 'API_REQUEST_FAILURE', payload: error, error: true});
          if (isFunction(onFailure)) {
            dispatch(onFailure(error));
          }
        }
      )
      .finally(() => {
        if (type) {
          dispatch({type: 'API_REQUEST_END', payload: type});
        }
      });
  };
}

export function apiRequest(url, {method = 'GET', type, ...rest} = {}) {
  if (!isString(url)) {
    throw new Error('API request requires a url');
  }
  return {
    API: {
      payload: {
        type,
        url,
        method,
        ...rest,
      },
    },
  };
}
