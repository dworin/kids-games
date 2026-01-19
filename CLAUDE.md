# Kids Games - Classic Game Arcade

## Project Overview
A collection of 8 classic games built with vanilla HTML, CSS, and JavaScript. Designed for static hosting (GitHub Pages). No build step required.

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
    └── chess.html      # Full rules (castling, en passant, promotion)
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

## Development
To test locally:
```bash
python3 -m http.server 5678
# Visit http://localhost:5678
```

## Deployment
Hosted on GitHub Pages: https://dworin.github.io/kids-games/
