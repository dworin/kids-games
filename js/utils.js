// Shared utilities for the game collection

const GameUtils = {
    // High Score Management using localStorage
    highScores: {
        get(gameName) {
            const scores = JSON.parse(localStorage.getItem('gameHighScores') || '{}');
            return scores[gameName] || [];
        },

        add(gameName, playerName, score, metadata = {}) {
            const scores = JSON.parse(localStorage.getItem('gameHighScores') || '{}');
            if (!scores[gameName]) scores[gameName] = [];

            scores[gameName].push({
                player: playerName,
                score: score,
                date: new Date().toISOString(),
                ...metadata
            });

            // Sort by score (higher is better) and keep top 10
            scores[gameName].sort((a, b) => b.score - a.score);
            scores[gameName] = scores[gameName].slice(0, 10);

            localStorage.setItem('gameHighScores', JSON.stringify(scores));
            return scores[gameName];
        },

        clear(gameName) {
            const scores = JSON.parse(localStorage.getItem('gameHighScores') || '{}');
            if (gameName) {
                delete scores[gameName];
            } else {
                Object.keys(scores).forEach(key => delete scores[key]);
            }
            localStorage.setItem('gameHighScores', JSON.stringify(scores));
        },

        getAll() {
            return JSON.parse(localStorage.getItem('gameHighScores') || '{}');
        }
    },

    // Game Statistics
    stats: {
        get(gameName) {
            const stats = JSON.parse(localStorage.getItem('gameStats') || '{}');
            return stats[gameName] || { played: 0, won: 0, lost: 0, draws: 0 };
        },

        update(gameName, result) {
            const stats = JSON.parse(localStorage.getItem('gameStats') || '{}');
            if (!stats[gameName]) {
                stats[gameName] = { played: 0, won: 0, lost: 0, draws: 0 };
            }
            stats[gameName].played++;
            if (result === 'win') stats[gameName].won++;
            else if (result === 'loss') stats[gameName].lost++;
            else if (result === 'draw') stats[gameName].draws++;

            localStorage.setItem('gameStats', JSON.stringify(stats));
            return stats[gameName];
        },

        clear(gameName) {
            const stats = JSON.parse(localStorage.getItem('gameStats') || '{}');
            if (gameName) {
                delete stats[gameName];
            } else {
                Object.keys(stats).forEach(key => delete stats[key]);
            }
            localStorage.setItem('gameStats', JSON.stringify(stats));
        }
    },

    // Player name management
    playerName: {
        get(playerNum = 1) {
            return localStorage.getItem(`player${playerNum}Name`) || `Player ${playerNum}`;
        },

        set(name, playerNum = 1) {
            localStorage.setItem(`player${playerNum}Name`, name);
        }
    },

    // Render high scores table
    renderHighScores(gameName, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scores = this.highScores.get(gameName);

        if (scores.length === 0) {
            container.innerHTML = '<p class="no-scores">No high scores yet!</p>';
            return;
        }

        let html = '<table class="high-scores-table"><thead><tr><th>#</th><th>Player</th><th>Score</th><th>Date</th></tr></thead><tbody>';
        scores.forEach((score, index) => {
            const date = new Date(score.date).toLocaleDateString();
            html += `<tr><td>${index + 1}</td><td>${this.escapeHtml(score.player)}</td><td>${score.score}</td><td>${date}</td></tr>`;
        });
        html += '</tbody></table>';

        container.innerHTML = html;
    },

    // Render game stats
    renderStats(gameName, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.stats.get(gameName);
        const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-value">${stats.played}</span>
                    <span class="stat-label">Played</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${stats.won}</span>
                    <span class="stat-label">Won</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${stats.lost}</span>
                    <span class="stat-label">Lost</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${stats.draws}</span>
                    <span class="stat-label">Draws</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${winRate}%</span>
                    <span class="stat-label">Win Rate</span>
                </div>
            </div>
        `;
    },

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Create a standard deck of cards
    createDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];

        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value, faceUp: false });
            }
        }

        return this.shuffleArray(deck);
    },

    // Get card value for blackjack
    getCardValue(card, currentTotal = 0) {
        if (['J', 'Q', 'K'].includes(card.value)) return 10;
        if (card.value === 'A') return currentTotal + 11 > 21 ? 1 : 11;
        return parseInt(card.value);
    },

    // Get card display symbol
    getCardSymbol(suit) {
        const symbols = {
            hearts: '\u2665',
            diamonds: '\u2666',
            clubs: '\u2663',
            spades: '\u2660'
        };
        return symbols[suit] || '';
    },

    // Delay helper for animations
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Modal helper
    showModal(title, content, buttons = []) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        let buttonsHtml = '';
        buttons.forEach((btn, index) => {
            buttonsHtml += `<button class="modal-btn ${btn.primary ? 'primary' : ''}" data-index="${index}">${btn.text}</button>`;
        });

        overlay.innerHTML = `
            <div class="modal">
                <h2 class="modal-title">${title}</h2>
                <div class="modal-content">${content}</div>
                <div class="modal-buttons">${buttonsHtml}</div>
            </div>
        `;

        document.body.appendChild(overlay);

        return new Promise(resolve => {
            overlay.querySelectorAll('.modal-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    overlay.remove();
                    if (buttons[index] && buttons[index].action) {
                        buttons[index].action();
                    }
                    resolve(index);
                });
            });
        });
    },

    // Go back to launcher
    goToLauncher() {
        window.location.href = '../index.html';
    }
};

// Export for use in modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameUtils;
}
