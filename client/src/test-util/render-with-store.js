import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import createStore from '../store/create';

export function renderWithStore(component, store = createStore()) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}
