/**
 * Game Configuration Constants
 *
 * All magic numbers and configuration values are centralized here
 * for easy modification and maintenance.
 */

/**
 * Board dimensions
 */
export const GRID_ROWS = 5 // 5 rows (top to bottom)
export const GRID_COLS = 3 // 3 columns (left to right)

/**
 * Piece configuration
 */
export const PIECES_PER_PLAYER = 3 // Each player starts with 3 pieces

/**
 * Match configuration
 */
export const ROUNDS_TO_WIN = 2 // First to win 2 rounds wins the match
export const TOTAL_ROUNDS = 3 // Best of 3 rounds

/**
 * Starting positions
 * Player 1 starts at row 2, Player 2 starts at row 4
 * Both players place pieces at columns 1, 2, and 3
 */
export const PLAYER1_START_ROW = 2
export const PLAYER2_START_ROW = 4

/**
 * Win conditions
 * Player 1 must reach row 5 to win
 * Player 2 must reach row 1 to win
 */
export const PLAYER1_WIN_ROW = 5
export const PLAYER2_WIN_ROW = 1

/**
 * Player configurations
 * Defines symbols, movement directions, and win conditions
 */
export const PLAYERS = {
  1: {
    id: 1 as const,
    symbol: "O" as const,
    direction: 1 as const, // Moves downward (row 2 → 3 → 4 → 5)
    winRow: PLAYER1_WIN_ROW,
  },
  2: {
    id: 2 as const,
    symbol: "X" as const,
    direction: -1 as const, // Moves upward (row 4 → 3 → 2 → 1)
    winRow: PLAYER2_WIN_ROW,
  },
}
