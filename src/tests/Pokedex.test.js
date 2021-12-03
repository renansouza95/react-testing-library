import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import App from '../App';

const pokemons = data;
const isPokemonFavoriteById = {
  [pokemons[0].id]: false,
  [pokemons[1].id]: false,
};
// const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

// Feito com ajuda da Samantha na monitoria
test('Testa se a página tem um h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const headingEl = screen.getByRole('heading',
    { level: 2, name: /encountered pokémons/i });
  expect(headingEl).toBeInTheDocument();
});

test('Teste se exibe próximo pokémon ao clicar no botão', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const nextButton = screen.getByTestId('next-pokemon');
  expect(nextButton).toHaveTextContent('Próximo pokémon');

  userEvent.click(nextButton);
});

test('Teste se a Pokédex tem botões de filtro', () => {
  renderWithRouter(<App />);

  const maxLength = 7;
  const typeButton = screen.getByRole('button');
  expect(typeButton).toHaveLength(maxLength);

  userEvent.click(typeButton);

  const clearButton = screen.getByText('All');
  expect(clearButton).toBeInTheDocument();

  expect(pokemonType).toBe('Psychic');
});
