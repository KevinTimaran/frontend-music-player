import { type CSSProperties } from 'react'

interface PlayerControlsProps {
  onPlay: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
  onSeek: (seconds: number) => void
  onVolumeChange: (volume: number) => void
  status: string
  hasSongs: boolean
  currentTime: number
  duration: number
  volume: number
}

const formatTime = (timeInSeconds: number): string => {
  const totalSeconds = Number.isFinite(timeInSeconds) ? Math.max(0, Math.floor(timeInSeconds)) : 0
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const createSliderStyle = (valuePercentage: number): CSSProperties => {
  const clampedValue = Math.max(0, Math.min(100, valuePercentage))

  return {
    background: `linear-gradient(90deg,
      color-mix(in srgb, var(--accent) 92%, white) 0%,
      color-mix(in srgb, var(--accent) 92%, white) ${clampedValue}%,
      color-mix(in srgb, var(--bg-tertiary) 90%, transparent) ${clampedValue}%,
      color-mix(in srgb, var(--bg-tertiary) 90%, transparent) 100%)`,
  }
}

export function PlayerControls({
  onPlay,
  onStop,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  status,
  hasSongs,
  currentTime,
  duration,
  volume,
}: PlayerControlsProps) {
  const isPlaying = status === 'PLAYING' || status === 'RESUMED'
  const safeDuration = Number.isFinite(duration) ? Math.max(duration, 0) : 0
  const safeCurrentTime = Number.isFinite(currentTime) ? Math.max(currentTime, 0) : 0
  const clampedCurrentTime = safeDuration > 0 ? Math.min(safeCurrentTime, safeDuration) : safeCurrentTime
  const progressPercent = safeDuration > 0 ? (clampedCurrentTime / safeDuration) * 100 : 0

  const handlePlayStopToggle = (): void => {
    if (!hasSongs) {
      return
    }

    if (isPlaying) {
      onStop()
      return
    }

    onPlay()
  }

  return (
    <section className="playback-card">
      <div className="playback-card__header">
        <h3 className="playback-card__title">Playback Controls</h3>
        <span className={`playback-card__badge status-${status.toLowerCase()}`}>{status}</span>
      </div>

      <div className="controls-grid">
        <div className="progress-panel">
          <div className="progress-head">
            <label className="progress-label" htmlFor="progress-range">
              TRACK PROGRESS
            </label>
            <div className="progress-meta">
              <span className="progress-time">{formatTime(clampedCurrentTime)}</span>
              <span className="progress-duration">{formatTime(safeDuration)}</span>
            </div>
          </div>
          <input
            id="progress-range"
            type="range"
            min={0}
            max={Math.max(0, safeDuration)}
            step={0.1}
            value={safeDuration > 0 ? clampedCurrentTime : 0}
            onChange={(event) => onSeek(Number(event.target.value))}
            className="progress-slider"
            style={createSliderStyle(progressPercent)}
            disabled={!hasSongs || safeDuration <= 0}
            aria-label="Seek song position"
          />
        </div>

        <div className="volume-panel">
          <div className="progress-head">
            <label className="volume-label" htmlFor="volume-range">
              VOLUME
            </label>
            <span className="volume-value">{Math.round(volume)}%</span>
          </div>
          <div className="volume-row">
            <span className="volume-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 10V14H8L13 18V6L8 10H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M16 9C17.5 10.5 17.5 13.5 16 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M18.8 6.2C21.2 8.6 21.2 15.4 18.8 17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <input
              id="volume-range"
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.max(0, Math.min(100, volume))}
              onChange={(event) => onVolumeChange(Number(event.target.value))}
              className="volume-slider"
              style={createSliderStyle(volume)}
              aria-label="Adjust volume"
            />
          </div>
        </div>

        <div className="controls-row">
          <button
            type="button"
            className="media-button primary"
            onClick={onPrevious}
            disabled={!hasSongs}
            title="Play previous song"
          >
            <span aria-hidden="true">⏮️</span>
            <span>Previous</span>
          </button>
          <label
            className={`container media-button primary play-stop-toggle ${isPlaying ? 'is-active' : ''} ${!hasSongs ? 'is-disabled' : ''}`}
            role="button"
            tabIndex={hasSongs ? 0 : -1}
            aria-label={isPlaying ? 'Stop playback' : 'Play current song'}
            onClick={handlePlayStopToggle}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handlePlayStopToggle()
              }
            }}
          >
            <input type="checkbox" checked={isPlaying} readOnly />
            <svg className="play" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 6L19 12L8 18V6Z" fill="currentColor" />
            </svg>
            <svg className="pause" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="8" y="8" width="8" height="8" rx="1.5" fill="currentColor" />
            </svg>
            <span className="toggle-label">{isPlaying ? 'Stop' : 'Play'}</span>
          </label>
          <button
            type="button"
            className="media-button primary"
            onClick={onNext}
            disabled={!hasSongs}
            title="Play next song"
          >
            <span aria-hidden="true">⏭️</span>
            <span>Next</span>
          </button>
        </div>
      </div>
    </section>
  )
}
