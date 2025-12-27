/**
 * Type Definitions for 3v3 Pawn Game
 *
 * This file contains all TypeScript interfaces and type definitions
 * used throughout the game. These types ensure type safety and provide
 * clear contracts for data structures.
 */

/**
 * Player identifier - either 1 or 2
 */
export type PlayerID = 1 | 2

/**
 * Position on the game board
 * Row: 1-5 (top to bottom)
 * Col: 1-3 (left to right)
 */
export interface Position {
  row: number
  col: number
}

/**
 * Game piece representation
 * Each player has 3 pieces that can move and capture
 */
export interface Piece {
  id: string // Unique identifier (e.g., "p1-1", "p2-2")
  player: PlayerID // Which player owns this piece
  position: Position // Current position on the board
  isAlive: boolean // False if piece has been captured
}

/**
 * Player configuration
 * Defines movement direction and win condition for each player
 */
export interface PlayerInfo {
  id: PlayerID
  symbol: "O" | "X" // Display symbol for the player
  direction: 1 | -1 // 1 = moves down (row increases), -1 = moves up (row decreases)
  winRow: number // Row number that triggers a win for this player
}

/**
 * Match score tracker
 * Tracks round wins for each player (best of 3 rounds)
 */
export interface GameScores {
  player1: number
  player2: number
}

/**
 * Game phase states
 * - setup: Choosing starting player
 * - playing: Active gameplay
 * - roundEnd: Round has ended, showing winner
 * - matchEnd: Match completed (2 rounds won)
 */
export type GamePhase = "setup" | "playing" | "roundEnd" | "matchEnd"

/**
 * Complete game state
 * This is the single source of truth for the entire game
 */
export interface GameState {
  pieces: Piece[] // All pieces on the board
  currentPlayer: PlayerID // Whose turn it is
  round: number // Current round (1-3)
  scores: GameScores // Round wins for each player
  phase: GamePhase // Current game phase
  selectedPiece: string | null // ID of currently selected piece
  validMoves: Position[] // Valid moves for selected piece
  startingPlayer: PlayerID // Who started the current round
  roundWinner: PlayerID | null // Winner of the current round
  matchWinner: PlayerID | null // Winner of the match (2 rounds)
}

/**
 * Move representation
 * Used for tracking and validating piece movements
 */
export interface Move {
  pieceId: string
  from: Position
  to: Position
  isCapture: boolean
  capturedPieceId?: string
}
