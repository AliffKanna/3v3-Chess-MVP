/**
 * Game State Management
 *
 * Functions for initializing and resetting game state.
 * These are pure functions that return new state objects.
 */

import type { GameState, Piece, PlayerID } from "./types"
import { PLAYER1_START_ROW, PLAYER2_START_ROW, PIECES_PER_PLAYER } from "./constants"

/**
 * Creates the initial set of pieces for both players
 *
 * Player 1 (O): 3 pieces at row 2, columns 1-3
 * Player 2 (X): 3 pieces at row 4, columns 1-3
 *
 * @returns Array of all pieces in their starting positions
 */
export function createInitialPieces(): Piece[] {
  const pieces: Piece[] = []

  // Create Player 1 pieces (O) at row 2
  for (let col = 1; col <= PIECES_PER_PLAYER; col++) {
    pieces.push({
      id: `p1-${col}`,
      player: 1,
      position: { row: PLAYER1_START_ROW, col },
      isAlive: true,
    })
  }

  // Create Player 2 pieces (X) at row 4
  for (let col = 1; col <= PIECES_PER_PLAYER; col++) {
    pieces.push({
      id: `p2-${col}`,
      player: 2,
      position: { row: PLAYER2_START_ROW, col },
      isAlive: true,
    })
  }

  return pieces
}

/**
 * Creates a fresh game state for a new match
 *
 * @param startingPlayer - Which player goes first (1 or 2)
 * @returns Complete initial game state
 */
export function createInitialState(startingPlayer: PlayerID): GameState {
  return {
    pieces: createInitialPieces(),
    currentPlayer: startingPlayer,
    round: 1,
    scores: { player1: 0, player2: 0 },
    phase: "playing",
    selectedPiece: null,
    validMoves: [],
    startingPlayer,
    roundWinner: null,
    matchWinner: null,
  }
}

/**
 * Resets the board for the next round
 *
 * - Pieces return to starting positions
 * - Starting player alternates from previous round
 * - Scores are preserved
 *
 * @param state - Current game state
 * @returns New state ready for next round
 */
export function resetBoardForNextRound(state: GameState): GameState {
  // Alternate the starting player for fairness
  const newStartingPlayer: PlayerID = state.startingPlayer === 1 ? 2 : 1

  return {
    ...state,
    pieces: createInitialPieces(),
    currentPlayer: newStartingPlayer,
    startingPlayer: newStartingPlayer,
    selectedPiece: null,
    validMoves: [],
    roundWinner: null,
    phase: "playing",
  }
}
