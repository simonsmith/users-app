import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './store/create';
import App from './App';

import {requestAllUsers} from './store/actions/users';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(requestAllUsers());
