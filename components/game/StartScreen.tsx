"use client"

// Starting player selection screen

import { Button } from "@/components/game/ui/button"
import type { PlayerID } from "@/library/game/types"

/**
 * StartScreen Component
 *
 * Pre-game screen for selecting which player goes first.
 *
 * Features:
 * - Brief game description
 * - Three starting player options:
 *   1. Player 1 First (O)
 *   2. Player 2 First (X)
 *   3. Random selection
 * - Clean centered layout
 *
 * Game Flow:
 * StartScreen -> Game Play -> Winner Modal -> (loop)
 *
 * @param onStart - Callback fired when player selection is made, receives chosen PlayerID
 */

interface StartScreenProps {
  onStart: (startingPlayer: PlayerID) => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  const handleRandom = () => {
    const random: PlayerID = Math.random() < 0.5 ? 1 : 2
    onStart(random)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold">Pawn Game</h1>
        <p className="text-muted-foreground text-center max-w-md">
          A strategic two-player game where you must advance your pawns to the opposite side while blocking your
          opponent.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <p className="text-sm text-center text-muted-foreground mb-2">Who goes first?</p>
          <Button onClick={() => onStart(1)} size="lg" variant="outline">
            Player 1 First (O)
          </Button>
          <Button onClick={() => onStart(2)} size="lg" variant="outline">
            Player 2 First (X)
          </Button>
          <Button onClick={handleRandom} size="lg" variant="default">
            Random
          </Button>
        </div>
      </div>
    </div>
  )
}
