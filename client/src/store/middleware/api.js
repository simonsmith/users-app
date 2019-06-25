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
      type,
      payload: {url, method, onSuccess, onFailure, ...restConfig},
    } = action.API;

    dispatch({
      type: 'API_REQUEST_START',
      payload: type,
    });

    return axios({
      baseURL: BASE_URL,
      url,
      method,
      ...restConfig,
    })
      .then(
        response => {
          if (isFunction(onSuccess)) {
            dispatch(onSuccess(response));
          }
        },
        error => {
          dispatch({type: 'API_REQUEST_FAILURE', payload: error, error: true});
          if (isFunction(onFailure)) {
            dispatch(onFailure(error));
          }
        }
      )
      .finally(() => dispatch({type: 'API_REQUEST_END', payload: type}));
  };
}

export function apiRequest(
  url,
  type,
  {method = 'GET', onSuccess, onFailure, ...rest} = {}
) {
  if (!isString(url) || !isString(type)) {
    throw new Error('API request requires a valid type and url');
  }
  return {
    API: {
      type,
      payload: {
        url,
        method,
        onSuccess,
        onFailure,
        ...rest,
      },
    },
  };
}
