# Deutsch/English Word Games

Implementation of variations of NYT's Spelling Bee game and the classic board game Boggle, checking for word validity using a spell-check dictionary (this does lead to some issues - not all words are recognized, and some proper nouns are recognized that wouldn't count in either of these games, but they're still playable).

Boggle has various settings - 'generous' mode to allow you to reuse letters (e.g. if your grid had only 1 u, you could reuse it to spell usual), and 'speed mode' where you switch players with each word.

Spelling Bee is not quite finished - I want to make the tiles (currently circles) into hexagons. 

## Status

Not yet done :D

### Boggle todos:

- 'End turn' not working perfectly, should really be dispatched right after the highlight is removed...
- removing the highlight can happen in a ref, not an effect  
- Refactor CSS (it's terrible)

### Spelling Bee todos:

- make my circles into hexagons :weary:
- figure out how to reuse the logic I've already written for Boggle

### Next up

- refactor to pull out more shared logic - basically all score-keeping is the same across games. 1)playersData 2)current player 3)end game 4)end turn 5)speedmode - should only be active if 2+ players
- what's DIFFERENT about the two games? 1)the grid itself, 2)the logic for checking if a word is on the board
- how to use union types?? 
- Add Wordle
- load dictionaries when app loads
- Err rename repository
- Add BE - login, save scores, show stats, let you play with friends, etc. Need to write endpoints to save data and deploy via heroku, would need to rework scoring & gameplay... hmm.
