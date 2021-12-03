import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se um card com as informações do Pokémon é renderizado', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se é exibido o nome correto do pokémon', () => {
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
  });

  it('Testa se é exibido o tipo correto do pokémon', () => {
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
  });

  it('Testa se é exibido corretamente o peso do pokémon', () => {
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Testa se a imagem do pokémon é exibida na tela', () => {
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

test('Verifica se tem um link de navegação para exibir detalhes do pokémon', () => {
  const { history } = renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkDetails).toBeInTheDocument();
  userEvent.click(linkDetails);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Verifica se existe um ícone nos Pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');

  const favoriteBtn = screen.getByLabelText(/pokémon favoritado?/i);
  userEvent.click(favoriteBtn);

  const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
  expect(favoriteIcon).toBeInTheDocument();
  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
});
