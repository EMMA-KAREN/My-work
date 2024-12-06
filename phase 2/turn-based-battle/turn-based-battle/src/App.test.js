import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// Mocking the fetchPlayers to avoid making actual network requests
jest.mock('./App', () => ({
  ...jest.requireActual('./App'),
  fetchPlayers: jest.fn(() => Promise.resolve([])),
}));

test('renders homepage and navigates to game', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Check if the Home page is rendered
  expect(screen.getByText(/Welcome to the Battle Game!/)).toBeInTheDocument();

  // Navigate to game
  fireEvent.click(screen.getByText(/Start Game/));

  // Check if Game page is rendered
  expect(screen.getByText(/Turn-Based Battle Game/)).toBeInTheDocument();
});

test('can attack and heal', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Wait for the game page to load
  fireEvent.click(screen.getByText(/Start Game/));

  // Check if attack button works
  fireEvent.click(screen.getByText(/Attack/));
  await waitFor(() => expect(screen.getByText(/attacks/)).toBeInTheDocument());

  // Check if heal button works
  fireEvent.click(screen.getByText(/Heal/));
  await waitFor(() => expect(screen.getByText(/heals/)).toBeInTheDocument());
});
