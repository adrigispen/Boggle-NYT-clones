# Deutsch/English Word Games

Implementation of variations of NYT's Spelling Bee game and the classic board game Boggle, checking for word validity using a spell-check dictionary (this does lead to some issues - not all words are recognized, and some proper nouns are recognized that wouldn't count in either of these games, but they're still playable).

Boggle has various settings - 'generous' mode to allow you to reuse letters (e.g. if your grid had only 1 u, you could reuse it to spell usual), and 'speed mode' where you switch players with each word.

Spelling Bee is not quite finished - in the Times' version, it's always possible to find a 'pangram,' or a word that uses all 7 letters. I'm not using any such criteria to choose my letters right now, they're a just random set of 7 (means at the moment it can be unplayable if you get unlucky).

## Status

Not yet done :D

### Boggle todos:

- 'End turn' not working perfectly, should really be dispatched right after the highlight is removed...
- removing the highlight can happen in a ref, not an effect  
- Refactor CSS (it's terrible)
- bug fixes: German game is looking for correct capitalization right now :sweat: and recognizes capitalized words as different from lower case :see_no_evil:
- end game vs. see all solutions - I should give players a choice
- what should go in the header component? it needs a different name 

### Spelling Bee todos:

- make my circles into hexagons :weary:
- figure out how to reuse the logic I've already written for Boggle

### Next up

- refactor to pull out more shared logic - basically all score-keeping is the same across games. 1)playersData 2)current player 3)end game 4)end turn 5)speedmode - should only be active if 2+ players
- what's DIFFERENT about the two games? 1)the grid itself, 2)the logic for checking if a word is on the board
- how to use generic types?? the header component can be shared
- how to not pass the game as context?? it's a terrible solution, needs to be gone from the headers
- Add Wordle
- load dictionaries when app loads, no need for an effect
- Err rename repository
- Add BE - login, save scores, show stats, let you play with friends, etc. Need to write endpoints to save data and deploy via heroku, would need to rework scoring & gameplay... hmm.
