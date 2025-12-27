"use client"

import { useState } from "react"
import type { GameState, PlayerID } from "@/library/game/types"
import { createInitialState } from "@/library/game/gameState"
import { selectPiece, movePiece, startNextRound } from "@/library/game/gameLogic"
import { GameBoard } from "@/components/game/GameBoard"
import { TurnIndicator } from "@/components/game/TurnIndicator"
import { ScoreBoard } from "@/components/game/ScoreBoard"
import { StartScreen } from "@/components/game/StartScreen"
import { WinnerModal } from "@/components/game/WinnerModal"

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  const handleStart = (startingPlayer: PlayerID) => {
    setGameState(createInitialState(startingPlayer))
  }

  const handlePieceClick = (pieceId: string) => {
    if (!gameState || gameState.phase !== "playing") return
    setGameState(selectPiece(gameState, pieceId))
  }

  const handleCellClick = (row: number, col: number) => {
    if (!gameState || gameState.phase !== "playing") return
    setGameState(movePiece(gameState, { row, col }))
  }

  const handleNextRound = () => {
    if (!gameState) return
    setGameState(startNextRound(gameState))
  }

  const handleRestart = () => {
    setGameState(null)
  }

  // Show start screen
  if (!gameState) {
    return <StartScreen onStart={handleStart} />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 text-center border-b border-border">
        <h1 className="text-2xl font-bold">Pawn Game</h1>
      </header>

      <ScoreBoard round={gameState.round} scores={gameState.scores} />

      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <GameBoard state={gameState} onCellClick={handleCellClick} onPieceClick={handlePieceClick} />
      </main>

      <TurnIndicator currentPlayer={gameState.currentPlayer} />

      {/* Winner Modal */}
      {(gameState.phase === "roundEnd" || gameState.phase === "matchEnd") && gameState.roundWinner && (
        <WinnerModal
          winner={gameState.roundWinner}
          isMatchEnd={gameState.phase === "matchEnd"}
          onContinue={handleNextRound}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
