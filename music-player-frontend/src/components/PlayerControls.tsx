interface PlayerControlsProps {
  onPlay: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
}

export function PlayerControls({
  onPlay,
  onPause,
  onResume,
  onStop,
  onNext,
  onPrevious,
}: PlayerControlsProps) {
  return (
    <div className="controls-bar">
      <div className="controls-group">
        <button type="button" className="control-button primary" onClick={onPrevious}>
          ⏮️ Previous
        </button>
        <button type="button" className="control-button primary" onClick={onPlay}>
          ▶️ Play
        </button>
        <button type="button" className="control-button primary" onClick={onNext}>
          ⏭️ Next
        </button>
      </div>
      <div className="controls-group">
        <button type="button" className="control-button secondary" onClick={onPause}>
          ⏸️ Pause
        </button>
        <button type="button" className="control-button secondary" onClick={onResume}>
          ▶️ Resume
        </button>
        <button type="button" className="control-button secondary" onClick={onStop}>
          ⏹️ Stop
        </button>
      </div>
    </div>
  )
}
