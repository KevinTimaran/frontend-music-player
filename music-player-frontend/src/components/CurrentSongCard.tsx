import { type CSSProperties } from 'react'
import { Song } from '../domain/models/Song'

interface CurrentSongCardProps {
  song: Song | null
  status: string
}

const formatDuration = (durationInSeconds: number): string => {
  const totalSeconds = Math.max(0, Math.floor(durationInSeconds))
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

export function CurrentSongCard({ song, status }: CurrentSongCardProps) {
  const isPlaybackActive = status === 'PLAYING' || status === 'RESUMED'

  if (!song) {
    return (
      <div className="current-song-card">
        <div className="no-song-placeholder">
          <div className="audio-visualizer is-idle" aria-hidden="true">
            <div className="visualizer-ring visualizer-ring-1" />
            <div className="visualizer-ring visualizer-ring-2" />
            <div className="visualizer-ring visualizer-ring-3" />
            <div className="visualizer-core">
              <span className="visualizer-center-dot" />
            </div>
          </div>
          <h2>No song selected</h2>
          <p>Choose a song from the playlist or add a new one</p>
        </div>
      </div>
    )
  }

  const visualizerBars = Array.from({ length: 24 }, (_, index) => (
    <span
      key={`viz-bar-${index}`}
      className="visualizer-bar"
      style={{ '--bar-index': index } as CSSProperties}
    />
  ))

  return (
    <div className="current-song-card">
      <div className="hero-status-row">
        <span className="hero-status-label">Now Playing</span>
        <span className={`hero-status-pill status-${status.toLowerCase()}`}>{getStatusDisplay(status)}</span>
      </div>

      <div className={`audio-visualizer ${isPlaybackActive ? 'is-active' : 'is-idle'}`} aria-hidden="true">
        <div className="visualizer-ring visualizer-ring-1" />
        <div className="visualizer-ring visualizer-ring-2" />
        <div className="visualizer-ring visualizer-ring-3" />
        <div className="visualizer-bars">
          {visualizerBars}
        </div>
        <div className="visualizer-core">
          <span className="visualizer-center-dot" />
        </div>
      </div>

      <div className="hero-song-info" role="status" aria-live="polite">
        <h2 className="hero-song-title">{song.getTitle()}</h2>
        <p className="hero-song-artist">{song.getArtist()}</p>
        <div className="hero-song-submeta">
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
  )
}
