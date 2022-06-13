import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

jest.doMock('firebaseui');
jest.doMock('react-firebaseui');

test('renders logo', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
});
