// src/components/BattleLog.js
import React from 'react';

function BattleLog({ logs }) {
  return (
    <div className="mt-4">
      <h4>Battle Log</h4>
      <ul className="list-group">
        {logs.map((log, index) => (
          <li className="list-group-item" key={index}>
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BattleLog;
