import { useContext, useState } from "react";
import { BoggleGame, SettingsProps } from "../../shared/logic/Types";
import { BoggleContext } from "../../logic/Context";

export const Settings: React.FC<SettingsProps> = ({
  handleGameStart,
  setShowSettings,
}) => {
  const game = useContext(BoggleContext) as BoggleGame;
  const currentPlayers = game.playersData.map(({ playerName }) => playerName);

  const [players, setPlayers] = useState(currentPlayers);
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
            type="button"
            className="delete"
            value={index}
            onClick={() => deletePlayer(index)}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  ));

  function deletePlayer(index: number) {
    setPlayers(players.filter((_, i) => i !== index));
  }

  function addPlayer() {
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
          handleGameStart(
            Number(e.currentTarget.boardSize.value),
            e.currentTarget.language.value,
            players,
            e.currentTarget.speedMode.checked,
            e.currentTarget.generousMode.checked
          );
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
                  type="button"
                  onClick={addPlayer}
                  name="addPlayer"
                >
                  Add Player
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="settingsGroup">
          <h3 className="inputGroupLabel">Board Size</h3>
          <div className="inputGroup">
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
        </div>
        <div className="settingsGroup">
          <h3 className="inputGroupLabel">Language</h3>
          <div className="inputGroup">
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
        </div>
        <div className="settingsGroup">
          <h3 className="inputGroupLabel">Game play</h3>
          <div className="inputGroup">
            <label>
              <input type="checkbox" name="generousMode" defaultChecked />
              Generous mode
            </label>
            <label>
              <input type="checkbox" name="speedMode" />
              Speed mode
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

export default Settings;
