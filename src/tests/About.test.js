import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('Testa se a página contém h2 com texto About Pokédex', () => {
  render(<About />);
  const headingAbout = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
  expect(headingAbout).toBeInTheDocument();
});

// https://stackoverflow.com/questions/65122974/getbyrole-query-for-paragraph-not-working-during-react-testing
test('Testa se a página contém dois paágrafos sobre a Pokédex', () => {
  render(<About />);
  // const paragrafos = screen.getByRole('paragraph');
  const text1 = screen.getByText(/this application simulates a pokédex/i);
  const text2 = screen.getByText(/one can filter pokémons by type/i);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
});

// https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
test('Testa se a imagem de uma Pokédex é renderizada na página', () => {
  render(<About />);
  const image = screen.getByAltText(/pokédex/i);
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
