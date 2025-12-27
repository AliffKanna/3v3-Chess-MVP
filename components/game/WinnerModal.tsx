"use client"

// Round and match winner modal

import { Button } from "@/components/game/ui/button"
import type { PlayerID } from "@/library/game/types"
import { PLAYERS } from "@/library/game/constants"

/**
 * WinnerModal Component
 *
 * Modal overlay that announces round or match winners.
 *
 * Features:
 * - Shows winner's symbol prominently
 * - Different messaging for round vs match end
 * - Action button to continue or restart
 * - Semi-transparent backdrop to focus attention
 *
 * Display Logic:
 * - Round End: "Next Round" button -> resets board, alternates starting player
 * - Match End: "Play Again" button -> full game reset
 *
 * @param winner - ID of the winning player (1 or 2)
 * @param isMatchEnd - True if match is over (2 rounds won), false if just a round
 * @param onContinue - Handler for "Next Round" button (round end only)
 * @param onRestart - Handler for "Play Again" button (match end only)
 */

interface WinnerModalProps {
  winner: PlayerID
  isMatchEnd: boolean
  onContinue: () => void
  onRestart: () => void
}

export function WinnerModal({ winner, isMatchEnd, onContinue, onRestart }: WinnerModalProps) {
  const player = PLAYERS[winner]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border-2 border-foreground p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold">{isMatchEnd ? "Match Winner!" : "Round Winner!"}</h2>
          <div className="text-6xl">{player.symbol}</div>
          <p className="text-xl">
            Player {player.id} wins {isMatchEnd ? "the match" : "this round"}!
          </p>

          {isMatchEnd ? (
            <Button onClick={onRestart} size="lg" className="w-full">
              Play Again
            </Button>
          ) : (
            <Button onClick={onContinue} size="lg" className="w-full">
              Next Round
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
