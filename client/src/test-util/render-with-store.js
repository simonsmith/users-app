import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';

export function renderWithStore(component, store) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}
