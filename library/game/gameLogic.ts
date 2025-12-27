/**
 * Core Game Logic
 *
 * Functions that implement game rules: piece selection, movement,
 * capturing, win conditions, and round management.
 * All functions are pure and return new state objects.
 */

import type { GameState, PlayerID, Position } from "./types"
import { getPieceAt, getValidMoves } from "./validators"
import { PLAYERS, ROUNDS_TO_WIN } from "./constants"
import { resetBoardForNextRound } from "./gameState"

/**
 * Selects a piece and calculates its valid moves
 *
 * Rules:
 * - Only current player's pieces can be selected
 * - Dead pieces cannot be selected
 * - Valid moves are highlighted after selection
 *
 * @param state - Current game state
 * @param pieceId - ID of piece to select
 * @returns New state with piece selected and valid moves calculated
 */
export function selectPiece(state: GameState, pieceId: string): GameState {
  const piece = state.pieces.find((p) => p.id === pieceId)

  // Validate piece can be selected
  if (!piece || !piece.isAlive || piece.player !== state.currentPlayer) {
    return state
  }

  const validMoves = getValidMoves(state, piece)

  return {
    ...state,
    selectedPiece: pieceId,
    validMoves,
  }
}

/**
 * Moves the currently selected piece to a destination
 *
 * Process:
 * 1. Validates the move is legal
 * 2. Captures opponent piece if destination is occupied
 * 3. Checks for win condition (reaching target row)
 * 4. Switches turn to other player
 *
 * @param state - Current game state
 * @param to - Destination position
 * @returns New state after the move
 */
export function movePiece(state: GameState, to: Position): GameState {
  if (!state.selectedPiece) return state

  const piece = state.pieces.find((p) => p.id === state.selectedPiece)
  if (!piece) return state

  // Validate move is in the list of valid moves
  const isValid = state.validMoves.some((move) => move.row === to.row && move.col === to.col)
  if (!isValid) return state

  // Check if this is a capture move
  const capturedPiece = getPieceAt(state, to)

  // Update pieces: move selected piece and remove captured piece
  const newPieces = state.pieces.map((p) => {
    if (p.id === piece.id) {
      return { ...p, position: to }
    }
    if (capturedPiece && p.id === capturedPiece.id) {
      return { ...p, isAlive: false }
    }
    return p
  })

  // Check for win condition (piece reached target row)
  const player = PLAYERS[state.currentPlayer]
  const hasWon = to.row === player.winRow

  if (hasWon) {
    return handleRoundWin({
      ...state,
      pieces: newPieces,
      selectedPiece: null,
      validMoves: [],
    })
  }

  // Switch turn to other player
  const nextPlayer: PlayerID = state.currentPlayer === 1 ? 2 : 1

  return {
    ...state,
    pieces: newPieces,
    currentPlayer: nextPlayer,
    selectedPiece: null,
    validMoves: [],
  }
}

/**
 * Handles round win logic
 *
 * - Updates scores
 * - Checks if match is won (2 rounds)
 * - Sets appropriate game phase
 *
 * @param state - State after winning move
 * @returns New state with updated scores and phase
 */
function handleRoundWin(state: GameState): GameState {
  const winner = state.currentPlayer
  const newScores = { ...state.scores }

  if (winner === 1) {
    newScores.player1 += 1
  } else {
    newScores.player2 += 1
  }

  // Check if player has won the match (2 out of 3 rounds)
  if (newScores.player1 >= ROUNDS_TO_WIN || newScores.player2 >= ROUNDS_TO_WIN) {
    return {
      ...state,
      scores: newScores,
      roundWinner: winner,
      matchWinner: winner,
      phase: "matchEnd",
    }
  }

  // Round won, but match continues
  return {
    ...state,
    scores: newScores,
    roundWinner: winner,
    phase: "roundEnd",
  }
}

/**
 * Advances to the next round after a round ends
 *
 * - Resets board to starting positions
 * - Alternates starting player
 * - Increments round counter
 * - Preserves scores
 *
 * @param state - Current game state
 * @returns New state ready for next round
 */
export function startNextRound(state: GameState): GameState {
  if (state.phase !== "roundEnd") return state

  const newState = resetBoardForNextRound(state)
  return {
    ...newState,
    round: state.round + 1,
    scores: state.scores,
  }
}

/**
 * Resets the entire game for a new match
 *
 * @param startingPlayer - Which player should start the new match
 * @returns Fresh game state
 */
export function resetGame(startingPlayer: PlayerID): GameState {
  const { createInitialState } = require("./gameState")
  return createInitialState(startingPlayer)
}
