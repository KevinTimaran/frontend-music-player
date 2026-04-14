interface PlayerControlsProps {
  onPlay: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
  status: string
  hasSongs: boolean
}

export function PlayerControls({
  onPlay,
  onPause,
  onResume,
  onStop,
  onNext,
  onPrevious,
  status,
  hasSongs,
}: PlayerControlsProps) {
  const isPlaying = status === 'PLAYING'
  const isPaused = status === 'PAUSED'
  const isStopped = status === 'STOPPED'

  return (
    <div className="controls-bar">
      <div className="controls-header">
        <h3 className="controls-title">Playback Controls</h3>
        <span className={`controls-status status-${status.toLowerCase()}`}>{status}</span>
      </div>

      <div className="controls-group">
        <button
          type="button"
          className="control-button primary"
          onClick={onPrevious}
          disabled={!hasSongs}
          title="Play previous song"
        >
          ⏮️ Previous
        </button>
        <button
          type="button"
          className={`control-button primary ${isPlaying ? 'is-active' : ''}`}
          onClick={onPlay}
          disabled={!hasSongs || isPlaying}
          title="Play current song"
        >
          ▶️ Play
        </button>
        <button
          type="button"
          className="control-button primary"
          onClick={onNext}
          disabled={!hasSongs}
          title="Play next song"
        >
          ⏭️ Next
        </button>
      </div>

      <div className="controls-group">
        <button
          type="button"
          className={`control-button secondary ${isPaused ? 'is-active' : ''}`}
          onClick={onPause}
          disabled={!hasSongs || !isPlaying}
          title="Pause playback"
        >
          ⏸️ Pause
        </button>
        <button
          type="button"
          className="control-button secondary"
          onClick={onResume}
          disabled={!hasSongs || !isPaused}
          title="Resume playback"
        >
          ▶️ Resume
        </button>
        <button
          type="button"
          className={`control-button secondary ${isStopped ? 'is-active' : ''}`}
          onClick={onStop}
          disabled={!hasSongs || isStopped}
          title="Stop playback"
        >
          ⏹️ Stop
        </button>
      </div>
    </div>
  )
}
