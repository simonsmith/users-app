import axios from 'axios';
import {isFunction} from 'lodash-fp';

export default function apiMiddleware({dispatch}) {
  return next => action => {
    if (!action['API_REQUEST']) {
      return next(action);
    }
    const {
      type,
      meta: {url, method, transformer},
    } = action['API_REQUEST'];
    next({type: `${type}_REQUEST`});
    return axios({
      method,
      url,
    })
      .then(
        response => {
          const data = isFunction(transformer)
            ? transformer(response.data)
            : response.data;
          dispatch({
            type: `${type}_${method.toUpperCase()}_SUCCESS`,
            payload: data,
          });
        },
        error => {
          dispatch({type: `${type}_FAILURE`, error: true, payload: error});
        }
      )
      .catch(e => console.error(e));
  };
}

export function makeApiRequest({
  method = 'get',
  url,
  type,
  transformer = x => x,
}) {
  return {
    API_REQUEST: {
      type,
      meta: {method, url, transformer},
    },
  };
}
