import { SettingsProps } from "./Settings.types";

export const Settings: React.FC<SettingsProps> = ({
  settingsData,
  setSettingsData,
}) => {
  const rows = settingsData.players.map((name: string, index: number) => (
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
    const nextPlayers = settingsData.players.filter((e, i) => i !== index);
    setSettingsData({ ...settingsData, players: nextPlayers });
  }

  function addPlayer() {
    const nextPlayers = settingsData.players.concat("");
    setSettingsData({ ...settingsData, players: nextPlayers });
  }

  function setName(value: string, index: number) {
    const nextPlayers = settingsData.players.map((e, i) =>
      i == index ? value : e
    );
    setSettingsData({ ...settingsData, players: nextPlayers });
  }

  function setSize(value: number) {
    setSettingsData({ ...settingsData, size: value });
  }

  function setLanguage(value: string) {
    setSettingsData({ ...settingsData, language: value });
  }

  function toggleGenerous() {
    setSettingsData({
      ...settingsData,
      generousMode: !settingsData.generousMode,
    });
  }

  function toggleSpeed() {
    setSettingsData({ ...settingsData, speedMode: !settingsData.speedMode });
  }

  return (
    <>
      <div>
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
            <input
              type="radio"
              name="boardSize"
              value="3"
              onChange={() => setSize(3)}
              checked={settingsData.size === 3}
            />
            3x3
          </label>
          <label>
            <input
              type="radio"
              name="boardSize"
              value="4"
              onChange={() => setSize(4)}
              checked={settingsData.size === 4}
            />
            4x4
          </label>
          <label>
            <input
              type="radio"
              name="boardSize"
              value="5"
              onChange={() => setSize(5)}
              checked={settingsData.size === 5}
            />
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
              onChange={() => setLanguage("English")}
              checked={settingsData.language === "English"}
            />
            English
          </label>
          <label>
            <input
              type="radio"
              name="language"
              value="Deutsch"
              onChange={() => setLanguage("Deutsch")}
              checked={settingsData.language === "Deutsch"}
            />
            Deutsch
          </label>
        </div>
        <div className="settingsRow">
          <h3>Game play</h3>
          <label>
            <input
              type="checkbox"
              name="generousMode"
              onClick={toggleGenerous}
              checked={settingsData.generousMode}
            />
            Generous mode
          </label>
          <label>
            <input
              type="checkbox"
              name="speedMode"
              onClick={toggleSpeed}
              checked={settingsData.speedMode}
            />
            Speed mode
          </label>
        </div>
      </div>
    </>
  );
};

export default Settings;
