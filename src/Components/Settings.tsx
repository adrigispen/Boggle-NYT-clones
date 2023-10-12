import { useState } from "react";
import { SettingsProps } from "./Types";

export const Settings: React.FC<SettingsProps> = ({ handleGameStart }) => {
  const [players, setPlayers] = useState(["", ""]);

  const rows = players.map((name: string, index: number) => (
    <li key={index}>
      <div className="playerRow">
        <label>Player {index + 1}</label>
        <div>
          <input
            name={`player${index}`}
            value={name ? name : `Player ${index + 1}`}
            onChange={(e) => setName(e.target.value, index)}
          />
          {index != 0 && (
            <button value={index} onClick={() => deletePlayer(index)}>
              🗑️
            </button>
          )}
        </div>
      </div>
    </li>
  ));

  function deletePlayer(index: number) {
    setPlayers(players.filter((e, i) => i !== index));
  }

  function addPlayer() {
    setPlayers(players.concat(""));
  }

  function setName(value: string, index: number) {
    setPlayers(players.map((e, i) => (i == index ? value : e)));
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGameStart(
            Number(e.currentTarget.boardSize.value),
            e.currentTarget.language.value,
            players,
            e.currentTarget.speedMode.checked,
            e.currentTarget.generousMode.checked
          );
        }}
      >
        <div className="settingsRow">
          <h2>Settings</h2>
        </div>
        <div className="settingsRow">
          <h3>Players</h3>
          <ul>
            {rows}
            <li className="playerRow">
              <button onClick={() => addPlayer()}>Add Player</button>
            </li>
          </ul>
        </div>
        <div className="settingsRow">
          <h3>Board Size</h3>
          <label>
            <input type="radio" name="boardSize" value="3" />
            3x3
          </label>
          <label>
            <input type="radio" name="boardSize" value="4" defaultChecked />
            4x4
          </label>
          <label>
            <input type="radio" name="boardSize" value="5" />
            5x5
          </label>
        </div>
        <div className="settingsRow">
          <h3>Language</h3>
          <label>
            <input
              type="radio"
              name="language"
              value="English"
              defaultChecked
            />
            English
          </label>
          <label>
            <input type="radio" name="language" value="Deutsch" />
            Deutsch
          </label>
        </div>
        <div className="settingsRow">
          <h3>Game play</h3>
          <label>
            <input type="checkbox" name="generousMode" />
            Generous mode
          </label>
          <label>
            <input type="checkbox" name="speedMode" />
            Speed mode
          </label>
        </div>
        <button type="submit">Play Game</button>
      </form>
    </div>
  );
};

export default Settings;
