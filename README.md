# Deutsch/English Word Games

Implementation of variations of NYT's Spelling Bee game and the classic board game Boggle, checking for word validity using a spell-check dictionary (this does lead to some issues - not all words are recognized, and some proper nouns are recognized that wouldn't count in either of these games, but they're still playable).

Boggle has various settings - 'generous' mode to allow you to reuse letters (e.g. if your grid had only 1 u, you could reuse it to spell usual), and 'speed mode' where you switch players with each word.

Spelling Bee lets you play in speed mode with multiple players. There is at least one pangram (a word that uses all letters) for each board.

Both games are available in German and English, and when you end the game, you can see all possible solutions found by the computer.

## Status

Not yet done :D

### Fixes/todos:

- 'End turn' not working perfectly, should really be dispatched right after the highlight is removed...
- Get rid of useEffect
- Refactor to component-level CSS ?
- Figure out how to reuse logic in a nicer way
- Disable speedmode if only 1 player
- Figure out how to get a random Bee from the jump

### Next up

- Add Wordle
- Load dictionaries when app loads
- Rename repository
