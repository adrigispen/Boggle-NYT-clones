import { useState } from "react";
import { SpellingBeeSettingsProps } from "../../shared/logic/Types";

export const SpellingBeeSettings: React.FC<SpellingBeeSettingsProps> = ({
  handleGameStart,
  setShowSettings,
  playerNames,
}) => {
  const [players, setPlayers] = useState(playerNames);
  const rows = players.map((name: string, index: number) => (
    <div key={index} className="playerRow">
      <div className="inputCol">
        <input
          name={`player${index}`}
          value={name}
          onChange={(e) => setName(e.target.value, index)}
        />
        {index != 0 && (
          <button
            className="delete"
            value={index}
            onClick={(e) => deletePlayer(e, index)}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  ));

  function deletePlayer(e: React.MouseEvent, index: number) {
    e.preventDefault();
    setPlayers(players.filter((_, i) => i !== index));
  }

  function addPlayer(e: React.MouseEvent) {
    e.preventDefault();
    setPlayers(players.concat(`Player ${players.length + 1}`));
  }

  function setName(value: string, index: number) {
    setPlayers(players.map((e, i) => (i == index ? value : e)));
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGameStart(e.currentTarget.languageSB.value, players);
        }}
      >
        <h2>Settings</h2>
        <div className="settingsGroup">
          <h3 className="inputGroupLabel">Players</h3>
          <div className="inputGroup">
            {rows}
            <div className="playerRow">
              <div className="inputCol">
                <button
                  className="addPlayer"
                  onClick={(e) => addPlayer(e)}
                  name="addPlayer"
                >
                  Add Player
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="settingsGroup">
          <h3 className="inputGroupLabel">Language</h3>
          <div className="inputGroup">
            <label>
              <input
                type="radio"
                name="languageSB"
                value="English"
                defaultChecked
              />
              English
            </label>
            <label>
              <input type="radio" name="languageSB" value="Deutsch" />
              Deutsch
            </label>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowSettings(false);
            }}
          >
            Close
          </button>
          <button type="submit">Start Game</button>
        </div>
      </form>
    </div>
  );
};

export default SpellingBeeSettings;
