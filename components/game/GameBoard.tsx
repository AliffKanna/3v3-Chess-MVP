"use client"

// Game board grid component

import type { GameState } from "@/library/game/types"
import { GRID_ROWS, GRID_COLS } from "@/library/game/constants"
import { GamePiece } from "./GamePiece"

interface GameBoardProps {
  state: GameState
  onCellClick: (row: number, col: number) => void
  onPieceClick: (pieceId: string) => void
}

/**
 * GameBoard Component
 *
 * Main game board that renders the 5x3 grid with all pieces and interactions.
 *
 * Features:
 * - Displays 5 rows x 3 columns grid
 * - Shows row and column labels for reference
 * - Highlights valid moves when a piece is selected
 * - Handles piece selection and movement
 * - Provides visual feedback for captures
 *
 * Grid Layout:
 *     1   2   3  (columns)
 * 1  [ ] [ ] [ ]
 * 2  [O] [O] [O]  <- Player 1 starting position
 * 3  [ ] [ ] [ ]
 * 4  [X] [X] [X]  <- Player 2 starting position
 * 5  [ ] [ ] [ ]
 *
 * @param state - Current game state containing pieces and valid moves
 * @param onCellClick - Handler for clicking empty or valid move cells
 * @param onPieceClick - Handler for clicking pieces to select them
 */

export function GameBoard({ state, onCellClick, onPieceClick }: GameBoardProps) {
  const isValidMove = (row: number, col: number) => {
    return state.validMoves.some((move) => move.row === row && move.col === col)
  }

  const isPieceSelected = (pieceId: string) => {
    return state.selectedPiece === pieceId
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Column labels */}
      <div className="flex gap-2 mb-2">
        <div className="w-8" /> {/* spacer for row labels */}
        {Array.from({ length: GRID_COLS }, (_, i) => (
          <div key={i} className="w-20 h-8 flex items-center justify-center text-sm text-muted-foreground font-mono">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: GRID_ROWS }, (_, rowIndex) => {
          const row = rowIndex + 1
          return (
            <div key={row} className="flex gap-2">
              {/* Row label */}
              <div className="w-8 h-20 flex items-center justify-center text-sm text-muted-foreground font-mono">
                {row}
              </div>

              {/* Cells */}
              {Array.from({ length: GRID_COLS }, (_, colIndex) => {
                const col = colIndex + 1
                const piece = state.pieces.find((p) => p.isAlive && p.position.row === row && p.position.col === col)
                const isValid = isValidMove(row, col)

                return (
                  <button
                    key={`${row}-${col}`}
                    onClick={() => {
                      if (piece) {
                        onPieceClick(piece.id)
                      } else if (isValid) {
                        onCellClick(row, col)
                      }
                    }}
                    className={`
                      w-20 h-20 border-2 border-foreground flex items-center justify-center
                      text-4xl font-bold transition-colors
                      ${isValid ? "bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer" : ""}
                      ${!isValid && !piece ? "bg-background" : ""}
                      ${piece && isPieceSelected(piece.id) ? "bg-blue-500/30 ring-2 ring-blue-500" : ""}
                      ${piece && !isPieceSelected(piece.id) && piece.isAlive ? "bg-red-500/30" : ""}
                    `}
                  >
                    {piece && <GamePiece player={piece.player} isSelected={isPieceSelected(piece.id)} />}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
