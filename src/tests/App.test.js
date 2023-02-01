import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('testes', () => {
  render(<App />);
  test('primeiro teste', () => {
    const nameFilter = screen.getByTestId('name-filter');
    const coluna = screen.getByTestId('column-filter')
    expect(nameFilter).toBeInTheDocument()
    expect(coluna).toBeInTheDocument()
  }) 
})
