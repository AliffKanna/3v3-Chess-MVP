"use client"

/**
 * GameCell Component
 *
 * Represents a single cell in the 5x3 game grid.
 *
 * Responsibilities:
 * - Renders the cell with appropriate styling
 * - Shows if the cell is a valid move destination
 * - Displays a piece if one occupies this position
 * - Handles click events for piece selection or movement
 *
 * Visual States:
 * - Empty: Default background
 * - Valid move: Blue highlight with hover effect
 * - Occupied: Contains a GamePiece component
 * - Selected piece: Blue ring highlight
 */

import type { Position, Piece as PieceType } from "@/library/game/types"
import { GamePiece } from "./GamePiece"

interface GameCellProps {
  position: Position
  piece: PieceType | undefined
  isValidMove: boolean
  isSelected: boolean
  onCellClick: (row: number, col: number) => void
  onPieceClick: (pieceId: string) => void
}

export function GameCell({ position, piece, isValidMove, isSelected, onCellClick, onPieceClick }: GameCellProps) {
  const handleClick = () => {
    if (piece) {
      onPieceClick(piece.id)
    } else if (isValidMove) {
      onCellClick(position.row, position.col)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`
        w-20 h-20 border-2 border-foreground flex items-center justify-center
        text-4xl font-bold transition-colors
        ${isValidMove ? "bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer" : ""}
        ${!isValidMove && !piece ? "bg-background" : ""}
        ${piece && isSelected ? "bg-blue-500/30 ring-2 ring-blue-500" : ""}
      `}
    >
      {piece && <GamePiece player={piece.player} isSelected={isSelected} />}
    </button>
  )
}
