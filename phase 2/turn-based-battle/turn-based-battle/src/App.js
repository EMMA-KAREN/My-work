import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayerCard from './Compoent/PlayerCard';
import BattleLog from './Compoent/BattleLog';
import GameControls from './Compoent/GameControls';


function App() {
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  const [maxHealth, setMaxHealth] = useState({});

  const fetchPlayers = () => {
    fetch('http://localhost:3000/players')
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        setMaxHealth(
          data.reduce((acc, player) => {
            acc[player.id] = player.health;
            return acc;
          }, {})
        );
      })
      .catch((error) => console.error('Error fetching players:', error));
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAttack = () => {
    const attacker = players[currentTurn];
    const defender = players[1 - currentTurn];

    const updatedDefender = {
      ...defender,
      health: Math.max(0, defender.health - attacker.attack),
    };

    const updatedPlayers = players.map((player) =>
      player.id === updatedDefender.id ? updatedDefender : player
    );

    setPlayers(updatedPlayers);
    setBattleLog([
      ...battleLog,
      `${attacker.name} attacks ${defender.name} for ${attacker.attack} damage!`,
    ]);
    setCurrentTurn(1 - currentTurn);
  };

  const handleHeal = () => {
    const healer = players[currentTurn];
    const healAmount = 20; // Define the amount of health to restore

    const updatedHealer = {
      ...healer,
      health: Math.min(maxHealth[healer.id], healer.health + healAmount),
    };

    const updatedPlayers = players.map((player) =>
      player.id === updatedHealer.id ? updatedHealer : player
    );

    setPlayers(updatedPlayers);
    setBattleLog([
      ...battleLog,
      `${healer.name} heals for ${healAmount} health!`,
    ]);
    setCurrentTurn(1 - currentTurn);
  };

  const restartGame = () => {
    fetchPlayers();
    setCurrentTurn(0);
    setBattleLog([]);
  };

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center">Turn-Based Battle Game</h1>

        {/* Navigation Links */}
        <div className="text-center">
          <Link to="/" className="btn btn-primary mx-2">
            Home
          </Link>
          <Link to="/game" className="btn btn-primary mx-2">
            Start Game
          </Link>
        </div>

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={<h2 className="text-center">Welcome to the Battle Game!</h2>}
          />

          {/* Game Route */}
          <Route
            path="/game"
            element={
              <>
                <div className="row">
                  {players.map((player, index) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      isCurrentTurn={index === currentTurn}
                    />
                  ))}
                </div>

                <GameControls
                  players={players}
                  onAttack={handleAttack}
                  onHeal={handleHeal}
                />
                <BattleLog logs={battleLog} />

                <div className="text-center mt-4">
                  <button className="btn btn-warning" onClick={restartGame}>
                    Restart Game
                  </button>
                </div>

                {players.some((p) => p.health === 0) && (
                  <h2 className="text-center mt-3">Game Over!</h2>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;