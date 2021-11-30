import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

const pikachuAlt = 'Pikachu crying because the page requested was not found';

test('Testa se há um h2 com o texto Page requested not found', () => {
  render(<NotFound />);
  const headingNotFound = screen.getByRole('heading',
    { level: 2, name: /page requested not found/i });
  expect(headingNotFound).toBeInTheDocument();
});

test('Verifica se a imagem é renderizada na tela', () => {
  render(<NotFound />);
  const imageNotFound = screen.getByAltText(pikachuAlt);
  expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
