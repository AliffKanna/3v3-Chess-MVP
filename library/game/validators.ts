/**
 * Move Validation Logic
 *
 * Pure functions that validate moves and determine valid destinations
 * for pieces. These functions do not modify state.
 */

import type { GameState, Position, Piece } from "./types"
import { PLAYERS, GRID_ROWS, GRID_COLS } from "./constants"

/**
 * Checks if a position is within the game board boundaries
 *
 * @param pos - Position to validate
 * @returns True if position is valid (within 1-5 rows and 1-3 columns)
 */
export function isValidPosition(pos: Position): boolean {
  return pos.row >= 1 && pos.row <= GRID_ROWS && pos.col >= 1 && pos.col <= GRID_COLS
}

/**
 * Finds a piece at a specific position on the board
 *
 * @param state - Current game state
 * @param pos - Position to check
 * @returns Piece at that position, or null if empty
 */
export function getPieceAt(state: GameState, pos: Position): Piece | null {
  return state.pieces.find((p) => p.isAlive && p.position.row === pos.row && p.position.col === pos.col) || null
}

/**
 * Calculates all valid moves for a given piece
 *
 * Movement rules:
 * - Can move straight forward (same column) if empty
 * - Can move diagonally forward (±1 column) to capture opponent
 * - Cannot move backward
 * - Cannot capture own pieces
 *
 * @param state - Current game state
 * @param piece - Piece to calculate moves for
 * @returns Array of valid destination positions
 */
export function getValidMoves(state: GameState, piece: Piece): Position[] {
  // Dead pieces or opponent's pieces cannot move
  if (!piece.isAlive || piece.player !== state.currentPlayer) {
    return []
  }

  const player = PLAYERS[piece.player]
  const moves: Position[] = []

  // Straight forward move (same column)
  const forwardPos: Position = {
    row: piece.position.row + player.direction,
    col: piece.position.col,
  }

  // Can only move forward if destination is empty
  if (isValidPosition(forwardPos) && !getPieceAt(state, forwardPos)) {
    moves.push(forwardPos)
  }

  // Diagonal capture moves (forward ±1 column)
  const diagonalPositions: Position[] = [
    {
      row: piece.position.row + player.direction,
      col: piece.position.col - 1, // Left diagonal
    },
    {
      row: piece.position.row + player.direction,
      col: piece.position.col + 1, // Right diagonal
    },
  ]

  for (const diagPos of diagonalPositions) {
    if (isValidPosition(diagPos)) {
      const targetPiece = getPieceAt(state, diagPos)
      // Can only capture opponent's piece (not empty, not own piece)
      if (targetPiece && targetPiece.player !== piece.player) {
        moves.push(diagPos)
      }
    }
  }

  return moves
}

/**
 * Checks if a specific move is valid for a piece
 *
 * @param state - Current game state
 * @param piece - Piece to move
 * @param to - Destination position
 * @returns True if the move is legal
 */
export function isValidMove(state: GameState, piece: Piece, to: Position): boolean {
  const validMoves = getValidMoves(state, piece)
  return validMoves.some((move) => move.row === to.row && move.col === to.col)
}
