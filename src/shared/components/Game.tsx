import { Dispatch, useContext, useRef } from "react";
import {
  PlayerData,
  WordGame,
  WordGameAction,
  WordGameActionType,
} from "../logic/Types";
import { Header } from "./Header";
import { SearchSection } from "./SearchSection";
import { Scoreboard } from "./Scoreboard";
import { FinalScores } from "./FinalScores";
import { SpellingBeeBoard } from "../../spellingBee/components/SpellingBeeBoard";
import { Grid } from "../../boggle/components/Grid";
import { WordGameContext, WordGameDispatchContext } from "../logic/Context";

export const Game: React.FC<{
  handleSearch: (currentSearch: string, playerData: PlayerData) => void;
  gameName: string;
}> = ({ handleSearch, gameName }) => {
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
        dispatch({
          type: WordGameActionType.GAME_ENDED,
        });
      }
    }, 1000);
  }

  function clearError() {
    dispatch({
      type: WordGameActionType.ERROR_CLEARED,
    });
  }

  function searchAndSwitch(currentSearch: string, playerData: PlayerData) {
    handleSearch(currentSearch, playerData);
    if (game.speedMode) endTurn();
  }

  const isLastPlayer =
    !game.speedMode && game.currentPlayer == game.playersData.length - 1;

  return (
    <>
      <Header
        gameName={gameName}
        playing={game.playing}
        playerNames={game.playersData.map(({ playerName }) => playerName)}
      />
      <div className="content">
        <div className="gamePanel">
          <SearchSection
            error={game.error}
            playerData={game.playersData[game.currentPlayer]}
            onSubmit={searchAndSwitch}
            playing={game.playing}
            clearError={clearError}
          />
        </div>
        {gameName === "Speedy Boggle" ? (
          <Grid grid={game.grid} selectionGrid={game.selectionGrid} />
        ) : (
          <SpellingBeeBoard
            centerLetter={game.centerLetter}
            edgeLetters={game.edgeLetters}
            playing={game.playing}
          />
        )}
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
