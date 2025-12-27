// Score and round tracker component

import type { GameScores } from "@/library/game/types"

interface ScoreBoardProps {
  round: number
  scores: GameScores
}

/**
 * ScoreBoard Component
 *
 * Displays current round number and match scores.
 *
 * Features:
 * - Shows current round (1/3, 2/3, or 3/3)
 * - Displays wins for both players
 * - Subtle styling to avoid distracting from gameplay
 *
 * Match Format:
 * - Best of 3 rounds
 * - First player to win 2 rounds wins the match
 *
 * @param round - Current round number (1, 2, or 3)
 * @param scores - Object containing wins for player1 and player2
 */

export function ScoreBoard({ round, scores }: ScoreBoardProps) {
  return (
    <div className="w-full py-3 border-b border-border flex items-center justify-center gap-8 text-sm text-muted-foreground">
      <div className="font-mono">Round {round}/3</div>
      <div className="flex gap-4 font-mono">
        <span>P1: {scores.player1}</span>
        <span>•</span>
        <span>P2: {scores.player2}</span>
      </div>
    </div>
  )
}
