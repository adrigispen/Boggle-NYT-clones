export const BoardSizeSettings: React.FC = () => {
  return (
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
  );
};
