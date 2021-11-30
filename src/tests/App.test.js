import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se o topo da aplicação tem um conjunto fixo de links', () => {
  renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', { name: /home/i });
  const linkAbout = screen.getByRole('link', { name: /about/i });
  const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});

test('Verifica link para Home', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const linkHome = screen.getByRole('link', { name: /home/i });
  expect(linkHome).toBeInTheDocument();
  userEvent.click(linkHome);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Verifica link para About', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const linkAbout = screen.getByRole('link', { name: /about/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Verifica link para Favoritos ', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(linkFavorite).toBeInTheDocument();
  userEvent.click(linkFavorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Verifica página Not Found ao entrar em uma URL desconhecida ', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/aabouut');
  const headingNotFound = screen.getByRole('heading',
    { level: 2, name: /page requested not found/i });
  expect(headingNotFound).toBeInTheDocument();
});
