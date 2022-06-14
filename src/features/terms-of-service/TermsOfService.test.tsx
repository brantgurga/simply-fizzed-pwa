import React from 'react';
import { render, screen } from '@testing-library/react';
import TermsOfService from './TermsOfService';

test('displays title', () => {
  render(
    <TermsOfService />
  );

  expect(screen.getByRole('heading', {name: /Terms of Service/i})).toBeInTheDocument();
});
