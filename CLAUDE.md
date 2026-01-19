# Kids Games - Classic Game Arcade

## Project Overview
A collection of 13 classic games built with vanilla HTML, CSS, and JavaScript. Designed for static hosting (GitHub Pages). No build step required.

## Structure
```
├── index.html          # Main launcher with game grid, stats, settings
├── css/styles.css      # Shared dark-theme styling
├── js/utils.js         # Shared utilities (high scores, stats, localStorage)
└── games/
    ├── tictactoe.html  # Minimax AI
    ├── mancala.html    # Stone-sowing mechanics
    ├── blackjack.html  # Chip betting system
    ├── war.html        # Auto-play with speed controls
    ├── hangman.html    # 5 word categories
    ├── memory.html     # 4 board sizes
    ├── checkers.html   # Multi-jumps, king promotion
    ├── chess.html      # Full rules (castling, en passant, promotion)
    ├── rushhour.html   # Sliding block puzzle, 20 levels
    ├── battleship.html # Naval combat with ship placement
    ├── minesweeper.html # Classic mine-clearing puzzle
    ├── paigowpoker.html # Casino card game with hand setting
    └── videopoker.html  # Jacks or Better draw poker
```

## Key Features
- All games support 1-player (vs AI) and 2-player modes
- AI difficulty levels: Easy, Medium, Hard
- High scores and statistics stored in localStorage
- Mobile-responsive design with dark theme

## GameUtils API (js/utils.js)
- `GameUtils.highScores.get(gameName)` - Get high scores array
- `GameUtils.highScores.add(gameName, playerName, score, metadata)` - Add score
- `GameUtils.stats.get(gameName)` - Get {played, won, lost, draws}
- `GameUtils.stats.update(gameName, 'win'|'loss'|'draw')` - Update stats
- `GameUtils.playerName.get(1|2)` - Get player name from settings
- `GameUtils.showModal(title, content, buttons)` - Show modal dialog
- `GameUtils.delay(ms)` - Promise-based delay for animations

## Game-Specific Notes

### Checkers
- Regular pieces move/jump forward only
- Kings (marked with ★) can move/jump all directions
- Mandatory captures enforced

### Chess
- Full rules including castling, en passant, pawn promotion
- Check/checkmate/stalemate detection
- Move history in algebraic notation

### Blackjack
- 6-deck shoe, dealer stands on 17
- Blackjack pays 3:2
- Chips persist in localStorage

### Rush Hour
- 20 puzzles across 4 difficulty levels (Beginner → Expert)
- Drag vehicles to slide them along their orientation
- Red car must reach the right exit to win
- Par scores and 3-star rating system
- Progress saved in localStorage

### Battleship
- 10x10 grid with 5 ships (Carrier, Battleship, Cruiser, Submarine, Destroyer)
- Ship placement phase with rotate and random options
- AI difficulty: Easy (random), Medium (hunt/target), Hard (checkerboard + smart targeting)
- 2-player mode with device passing

### Minesweeper
- 3 difficulty levels: Beginner (9x9, 10 mines), Intermediate (16x16, 40 mines), Expert (30x16, 99 mines)
- First click is always safe (mines placed after first click)
- Flood-fill reveals connected empty cells
- Right-click or long-press to flag mines
- Timer and mine counter display
- Score based on completion time and difficulty multiplier

### Pai Gow Poker
- 53-card deck (standard 52 + Joker)
- Joker completes straights/flushes, otherwise counts as Ace
- Player sets 7 cards into 5-card high hand and 2-card low hand
- High hand must rank higher than low hand (no fouling)
- Win both hands to win, lose both to lose, split is a push
- House Way button auto-sets hands using optimal strategy
- Chips persist in localStorage

### Video Poker
- Jacks or Better variant (9/6 full pay)
- 52-card deck, 5-card draw poker
- Click cards to hold, then draw to replace others
- Minimum winning hand: pair of Jacks or higher
- Bet 1-5 credits; max bet gives Royal Flush bonus (4000 vs 1250)
- Credits persist in localStorage

## Development
To test locally:
```bash
python3 -m http.server 5678
# Visit http://localhost:5678
```

## Deployment
Hosted on GitHub Pages: https://dworin.github.io/kids-games/

Repository: https://github.com/dworin/kids-games

## Bug Fixes Applied
1. **Tic Tac Toe AI not moving**: The `makeMove()` guard clause blocked AI moves. Fixed by adding `isAI` parameter to bypass the check when AI calls it.

2. **Checkers backward jumps**: Non-king pieces could jump backwards (bug). Removed erroneous code block that added backward jumps for regular pieces.

3. **Checkers mobile zoom**: King promotion triggered zoom on mobile. Fixed with:
   - Viewport meta: `maximum-scale=1.0, user-scalable=no`
   - CSS: `touch-action: manipulation` on board/cells
   - `-webkit-text-size-adjust: 100%` on body

4. **Checkers king symbol**: Unicode `\u265A` didn't render on mobile (showed "u265A"). Changed to `★` star character.

## Known Considerations
- Chess AI is heuristic-based (not deep search) - evaluates captures, center control, development
- Mancala AI prioritizes: extra turns > captures > most stones
- All game state stored in localStorage - clearing browser data resets scores
- Mobile-first testing recommended for UI changes
