// src/components/GameControls.js
function GameControls({ players, onAttack, onHeal }) {
    return (
      <div className="text-center mt-3">
        <button
          className="btn btn-danger mx-2"
          onClick={onAttack}
          disabled={players.length === 0}
        >
          Attack
        </button>
        <button
          className="btn btn-success mx-2"
          onClick={onHeal}
          disabled={players.length === 0}
        >
          Heal
        </button>
      </div>
    );
  }
  
  export default GameControls;
  