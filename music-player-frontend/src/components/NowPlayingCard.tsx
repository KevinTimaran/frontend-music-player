import { type CSSProperties } from 'react'
import { Song } from '../domain/models/Song'

interface NowPlayingCardProps {
  song: Song | null
  status: string
  hasSongs: boolean
  currentTime: number
  duration: number
  volume: number
  onPlay: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
  onSeek: (seconds: number) => void
  onVolumeChange: (volume: number) => void
}

const formatDuration = (durationInSeconds: number): string => {
  const totalSeconds = Math.max(0, Math.floor(durationInSeconds))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const formatTime = (timeInSeconds: number): string => {
  const totalSeconds = Number.isFinite(timeInSeconds) ? Math.max(0, Math.floor(timeInSeconds)) : 0
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const getStatusDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    PLAYING: 'Playing',
    PAUSED: 'Paused',
    STOPPED: 'Stopped',
    RESUMED: 'Resumed',
  }
  return statusMap[status] || status
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

export function NowPlayingCard({
  song,
  status,
  hasSongs,
  currentTime,
  duration,
  volume,
  onPlay,
  onStop,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}: NowPlayingCardProps) {
  const isPlaybackActive = status === 'PLAYING' || status === 'RESUMED'
  const isPlaying = status === 'PLAYING' || status === 'RESUMED'
  const visualStateClass = isPlaybackActive ? 'playing' : status === 'PAUSED' ? 'paused' : 'stopped'
  const ringHeights = [18, 32, 56, 28, 62, 44, 72, 36, 54, 68, 30, 60, 40, 52, 34, 66, 42, 58]

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

  if (!song) {
    return (
      <section className="now-playing-card">
        <div className="now-playing-visualizer-section">
          <div className="no-song-placeholder">
            <div className="audio-circle-visualizer stopped" aria-hidden="true">
              <div className="audio-circle-disc">
                <div className="audio-circle-core" />
              </div>
              {Array.from({ length: 18 }, (_, index) => (
                <span
                  key={`empty-wave-${index}`}
                  className="circle-bar stopped"
                  style={{
                    '--circle-index': index,
                    '--circle-height': `${ringHeights[index % ringHeights.length]}%`,
                  } as CSSProperties}
                />
              ))}
            </div>
            <h2 className="current-song-title">No song selected</h2>
            <p className="current-song-artist">Choose a song from the playlist or add a new one</p>
          </div>
        </div>

        <div className="now-playing-controls-section">
          <div className="controls-grid">
            <div className="progress-panel">
              <div className="progress-head">
                <label className="progress-label" htmlFor="progress-range">
                  TRACK PROGRESS
                </label>
                <div className="progress-meta">
                  <span className="progress-time">00:00</span>
                  <span className="progress-duration">00:00</span>
                </div>
              </div>
              <input
                id="progress-range"
                type="range"
                min={0}
                max={0}
                step={0.1}
                value={0}
                className="progress-slider"
                disabled={true}
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
              <div className="button-container">
                <div className="button-border" />
                <div className="button">
                  <button
                    type="button"
                    className="real-button"
                    onClick={onPrevious}
                    disabled={!hasSongs}
                    title="Play previous song"
                    aria-label="Play previous song"
                  />
                  <div className="backdrop" />
                  <div className="spin">
                    <div className="spin-blur" />
                    <div className="spin-intense" />
                    <div className="spin-inside" />
                  </div>
                  <span>Previous</span>
                </div>
              </div>
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
              <div className="button-container">
                <div className="button-border" />
                <div className="button">
                  <button
                    type="button"
                    className="real-button"
                    onClick={onNext}
                    disabled={!hasSongs}
                    title="Play next song"
                    aria-label="Play next song"
                  />
                  <div className="backdrop" />
                  <div className="spin">
                    <div className="spin-blur" />
                    <div className="spin-intense" />
                    <div className="spin-inside" />
                  </div>
                  <span>Next</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const circleBars = Array.from({ length: 18 }, (_, index) => (
    <span
      key={`circle-bar-${index}`}
      className={`circle-bar ${visualStateClass}`}
      style={{
        '--circle-index': index,
        '--circle-height': `${ringHeights[index % ringHeights.length]}%`,
      } as CSSProperties}
    />
  ))

  return (
    <section className="now-playing-card">
      <div className="now-playing-visualizer-section">
        <div className="current-song-topline">
          <span className="current-song-context">Now Playing</span>
          <span className={`current-song-state state-${status.toLowerCase()}`}>{getStatusDisplay(status)}</span>
        </div>

        <div className={`audio-circle-visualizer ${visualStateClass}`} aria-hidden="true">
          <div className="audio-circle-orbit audio-circle-orbit-outer" />
          <div className="audio-circle-orbit audio-circle-orbit-inner" />
          <div className="audio-circle-disc">
            <div className="audio-circle-disc-glow" />
            <div className="audio-circle-core" />
          </div>
          <div className="audio-circle-bars">{circleBars}</div>
        </div>

        <div className="current-song-info" role="status" aria-live="polite">
          <h2 className="current-song-title">{song.getTitle()}</h2>
          <p className="current-song-artist">{song.getArtist()}</p>
          <div className="current-song-meta">
            <span>{song.getGenre()}</span>
            <span className="submeta-dot" aria-hidden="true">•</span>
            <span>{formatDuration(song.getDuration())}</span>
            {isPlaybackActive && (
              <span className="hero-active-indicator" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            )}
            {isPlaybackActive && <span className="hero-active-text">Live</span>}
          </div>
        </div>
      </div>

      <div className="now-playing-controls-section">
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
            <div className="button-container">
              <div className="button-border" />
              <div className="button">
                <button
                  type="button"
                  className="real-button"
                  onClick={onPrevious}
                  disabled={!hasSongs}
                  title="Play previous song"
                  aria-label="Play previous song"
                />
                <div className="backdrop" />
                <div className="spin">
                  <div className="spin-blur" />
                  <div className="spin-intense" />
                  <div className="spin-inside" />
                </div>
                <span>Previous</span>
              </div>
            </div>
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
            <div className="button-container">
              <div className="button-border" />
              <div className="button">
                <button
                  type="button"
                  className="real-button"
                  onClick={onNext}
                  disabled={!hasSongs}
                  title="Play next song"
                  aria-label="Play next song"
                />
                <div className="backdrop" />
                <div className="spin">
                  <div className="spin-blur" />
                  <div className="spin-intense" />
                  <div className="spin-inside" />
                </div>
                <span>Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
