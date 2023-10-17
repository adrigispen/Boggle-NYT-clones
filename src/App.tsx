// import Settings from "./boggle/components/Settings";
// import { SettingsModal } from "./shared/SettingsModal";
// import { Grid } from "./boggle/components/Grid";
// import { useReducer, useState } from "react";
// import { Scoreboard } from "./shared/Scoreboard";
// import { SearchSection } from "./shared/SearchSection";
// import { FinalScores } from "./shared/components/FinalScores";
// import {
//   defaultGame,
//   initializePlayersData,
//   searchForWord,
// } from "./logic/helpers";
// import boggleReducer from "./boggle/logic/boggleReducer";
// import { BoggleActionType, PlayerData } from "./shared/logic/Types";
// import { BoggleContext, BoggleDispatchContext } from "./logic/Context";
// import { SpellingBee } from "./spellingBee/SpellingBee";

// function App() {
//   const [showSettings, setShowSettings] = useState(false);
//   const [game, dispatch] = useReducer(boggleReducer, defaultGame);

//   function handleSearch(currentSearch: string, playerData: PlayerData) {
//     searchForWord(
//       currentSearch,
//       game.settings.language,
//       playerData,
//       game.grid,
//       game.settings.generousMode
//     )
//       .then(({ selectionGrid, error, playerData }) => {
//         dispatch({
//           type: BoggleActionType.WORD_SEARCHED,
//           payload: {
//             selectionGrid,
//             error,
//             playerData,
//           },
//         });
//         // doesn't display the word - this action is too fast, resets the board to noHighlights
//         if (game.settings.speedMode) {
//           endTurn();
//         }
//       })
//       .catch((err) => console.log(err));
//   }

//   function endTurn() {
//     dispatch({
//       type: BoggleActionType.TURN_ENDED,
//     });
//   }

//   function handleGameStart(
//     size: number,
//     language: string,
//     players: string[],
//     speedMode: boolean,
//     generousMode: boolean
//   ) {
//     const playersData = initializePlayersData(players);
//     setShowSettings(false);
//     dispatch({
//       type: BoggleActionType.GAME_STARTED,
//       payload: { size, language, speedMode, generousMode, playersData },
//     });
//   }

//   return (
//     <>
//       <SpellingBee />
//       <BoggleContext.Provider value={game}>
//         <BoggleDispatchContext.Provider value={dispatch}>
//           <SettingsModal isOpen={showSettings}>
//             <Settings
//               handleGameStart={handleGameStart}
//               setShowSettings={setShowSettings}
//             />
//           </SettingsModal>
//           <div className="header">
//             <h1>
//               Speedy Boggle
//               <button
//                 className="openSettings"
//                 onClick={() => setShowSettings(true)}
//               >
//                 ⚙️
//               </button>
//             </h1>
//           </div>
//           <div className="content">
//             <div className="gamePanel">
//               <SearchSection
//                 error={game.error}
//                 playerData={game.playersData[game.currentPlayer]}
//                 onSubmit={handleSearch}
//               />
//               <Grid grid={game.grid} selectionGrid={game.selectionGrid} />
//             </div>
//             <div className="resultsPanel">
//               {game.currentPlayer !== -1 ? (
//                 <Scoreboard
//                   playerData={game.playersData[game.currentPlayer]}
//                   endTurn={endTurn}
//                 />
//               ) : (
//                 <FinalScores playersData={game.playersData} />
//               )}
//             </div>
//           </div>
//         </BoggleDispatchContext.Provider>
//       </BoggleContext.Provider>
//     </>
//   );
// }

// export default App;
