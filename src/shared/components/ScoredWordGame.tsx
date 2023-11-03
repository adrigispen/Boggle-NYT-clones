import { Dispatch, useContext, useRef } from "react";
import {
  PlayerData,
  WordGame,
  WordGameAction,
  WordGameActionType,
} from "../logic/Types";
import { SearchSection } from "./SearchSection";
import { Scoreboard } from "./Scoreboard";
import { FinalScores } from "./FinalScores";
import { WordGameContext, WordGameDispatchContext } from "../logic/Context";

export const ScoredWordGame: React.FC<{
  onSearch: (currentSearch: string, playerData: PlayerData) => void;
  onEndGame: () => void;
  children: JSX.Element;
}> = ({ onSearch, onEndGame, children }) => {
  const dispatch = useContext(
    WordGameDispatchContext
  ) as Dispatch<WordGameAction>;
  const game = useContext(WordGameContext) as WordGame;
  const switchPlayerRef = useRef<number | null>(null);

  function endTurn() {
    const shouldEndGame = isLastPlayer;
    switchPlayerRef.current = setTimeout(() => {
      dispatch({
        type: WordGameActionType.TURN_ENDED,
      });
      if (shouldEndGame) {
        onEndGame();
      }
    }, 1000);
  }

  function clearError() {
    dispatch({
      type: WordGameActionType.ERROR_CLEARED,
    });
  }

  function searchAndSwitch(currentSearch: string, playerData: PlayerData) {
    onSearch(currentSearch, playerData);
    if (game.speedMode) endTurn();
  }

  const isLastPlayer =
    !game.speedMode && game.currentPlayer == game.playersData.length - 1;

  return (
    <>
      <div className="content">
        <div className="gamePanel">
          <SearchSection
            error={game.error}
            playerData={game.playersData[game.currentPlayer]}
            onSubmit={searchAndSwitch}
            playing={game.playing}
            clearError={clearError}
          />
          {children}
        </div>
        <div className="resultsPanel">
          {game.playing ? (
            <Scoreboard
              playerData={game.playersData[game.currentPlayer]}
              endTurn={endTurn}
            />
          ) : (
            <FinalScores playersData={game.playersData} />
          )}
        </div>
      </div>
    </>
  );
};
