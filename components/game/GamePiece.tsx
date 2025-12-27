// Individual piece component

import type { PlayerID } from "@/library/game/types"
import { PLAYERS } from "@/library/game/constants"

/**
 * GamePiece Component
 *
 * Renders an individual game piece (O or X) with visual feedback.
 *
 * Features:
 * - Displays player symbol (O or X)
 * - Scales up when selected
 * - Smooth transition animation
 *
 * @param player - The player ID (1 or 2) who owns this piece
 * @param isSelected - Whether this piece is currently selected
 */

interface GamePieceProps {
  player: PlayerID
  isSelected: boolean
}

export function GamePiece({ player, isSelected }: GamePieceProps) {
  const symbol = PLAYERS[player].symbol

  return (
    <span
      className={`
        select-none transition-all
        ${isSelected ? "scale-110" : ""}
      `}
    >
      {symbol}
    </span>
  )
}
