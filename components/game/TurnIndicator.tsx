// Turn indicator component

import type { PlayerID } from "@/library/game/types"
import { PLAYERS } from "@/library/game/constants"

interface TurnIndicatorProps {
  currentPlayer: PlayerID
}

/**
 * TurnIndicator Component
 *
 * Displays whose turn it is with clear visual prominence.
 *
 * Features:
 * - Shows current player number and symbol
 * - Blue background for high visibility
 * - Positioned below the game board
 *
 * @param currentPlayer - The ID of the player whose turn it is (1 or 2)
 */

export function TurnIndicator({ currentPlayer }: TurnIndicatorProps) {
  const player = PLAYERS[currentPlayer]

  return (
    <div className="w-full py-4 bg-blue-500 text-white text-center">
      <p className="text-lg font-bold">
        Player {player.id}&apos;s Turn ({player.symbol})
      </p>
    </div>
  )
}
