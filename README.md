# Deutsch/English Word Games

Implementation of variations of NYT's Spelling Bee game and the classic board game Boggle, checking for word validity using a spell-check dictionary (this does lead to some issues - not all words are recognized, and some proper nouns are recognized that wouldn't count in either of these games, but they're still playable).

Boggle has various settings - 'generous' mode to allow you to reuse letters (e.g. if your grid had only 1 u, you could reuse it to spell usual), and 'speed mode' where you switch players with each word.

Spelling Bee is not quite finished - in the Times' version, it's always possible to find a 'pangram,' or a word that uses all 7 letters. I'm not using any such criteria to choose my letters right now, they're a just random set of 7 (means at the moment it can be unplayable if you get unlucky).

## Status

Not yet done :D

### Boggle todos:

- Speed mode - need an 'End Game' button? How to end speed mode?
- Refactor CSS (it's terrible)
- Remove word highlights and errors after timeout (half a second?)
- Move it to a component

### Spelling Bee todos:

- Add some logic to pull a reasonable set of letters, such that the player can always make a pangram
- make my circles into hexagons :weary:
- Speed mode? maybe

### Next up

- Add router and Wordle
- Err rename repository
- Add BE - login, save scores, show stats, let you play with friends, etc. Need to write endpoints to save data and deploy via heroku, would need to rework scoring & gameplay... hmm.
