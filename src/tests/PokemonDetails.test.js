import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se as informações do Pokémon selecionado são mostradas na tela.', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByText(/more details/i);
  expect(linkDetails).toBeInTheDocument();

  userEvent.click(linkDetails);

  const pokemonName = screen.getByText(/Pikachu Details/i);
  expect(pokemonName).toBeInTheDocument();

  const headingEl = screen.getByRole('heading', { level: 2, name: /summary/i });
  expect(headingEl).toBeInTheDocument();

  const description = screen.getByText(/This intelligent Pokémon/i);
  expect(description).toBeInTheDocument();
});

test('Testa se existe mapas com a localização do pokémon', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByText(/more details/i);
  userEvent.click(linkDetails);

  const headingEl = screen.getByRole('heading',
    { level: 2, name: 'Game Locations of Pikachu' });
  expect(headingEl).toBeInTheDocument();

  const locationName = screen.getByText(/Kanto Viridian Forest/i);
  expect(locationName).toBeInTheDocument();

  const mapImg = screen.getAllByAltText(/pikachu location/i);
  expect(mapImg[0]).toBeInTheDocument();
  expect(mapImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
});

test('Testa se o usuári pode favoritar o Pokémon', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByText(/more details/i);
  userEvent.click(linkDetails);

  const favoriteBtn = screen.getByLabelText(/pokémon favoritado?/i);
  expect(favoriteBtn).toBeInTheDocument();
  userEvent.click(favoriteBtn);

  const favoriteLink = screen.getByText(/favorite pokémons/i);
  userEvent.click(favoriteLink);

  const pokemonCard = screen.getByText(/pikachu/i);
  expect(pokemonCard).toBeInTheDocument();
});
