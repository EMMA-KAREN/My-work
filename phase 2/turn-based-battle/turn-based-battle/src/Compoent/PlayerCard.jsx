// src/components/PlayerCard.js
import React from 'react';

function PlayerCard({ player, isCurrentTurn }) {
  return (
    <div className="col-md-6">
      <div className="card text-center">
        <div className="card-body">
          <h3>{player.name}</h3>
          <p>Health: {player.health}</p>
          <p>Attack: {player.attack}</p>
          {isCurrentTurn && <span className="badge bg-primary">Your Turn</span>}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
