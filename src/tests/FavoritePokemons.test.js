import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pathToFavorites = '/favorites';

test('Testa se é exibido uma mensagem caso a pessoa não tenha pokémon favorito', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pathToFavorites);
  const noFavorite = screen.getByText(/no favorite pokemon found/i);
  expect(noFavorite).toBeInTheDocument();
});

test('Testa se todos os cards de pokémons favoritos são exibidos', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const detailsBtn = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailsBtn);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');

  const favoriteBtn = screen.getByLabelText(/pokémon favoritado?/i);
  userEvent.click(favoriteBtn);

  const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(linkFavorite);

  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
});
