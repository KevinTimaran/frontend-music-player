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
  const waveStateClass = isPlaybackActive ? 'playing' : status === 'PAUSED' ? 'paused' : 'stopped'
  const baseWaveHeights = [24, 44, 58, 36, 66, 48, 72, 40, 62, 50, 34, 68, 42, 56, 38, 60, 46, 30]

  if (!song) {
    return (
      <div className="current-song-card current-song-empty">
        <div className="no-song-placeholder">
          <div className="audio-wave-visualizer stopped" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <span
                key={`empty-wave-${index}`}
                className="wave-bar stopped"
                style={{ '--wave-index': index, '--wave-height': `${baseWaveHeights[index % baseWaveHeights.length]}%` } as CSSProperties}
              />
            ))}
          </div>
          <h2 className="current-song-title">No song selected</h2>
          <p className="current-song-artist">Choose a song from the playlist or add a new one</p>
        </div>
      </div>
    )
  }

  const waveBars = Array.from({ length: 18 }, (_, index) => (
    <span
      key={`wave-bar-${index}`}
      className={`wave-bar ${waveStateClass}`}
      style={{ '--wave-index': index, '--wave-height': `${baseWaveHeights[index % baseWaveHeights.length]}%` } as CSSProperties}
    />
  ))

  return (
    <div className={`current-song-card current-song-card-${waveStateClass}`}>
      <div className="current-song-topline">
        <span className="current-song-context">Now Playing</span>
        <span className={`current-song-state state-${status.toLowerCase()}`}>{getStatusDisplay(status)}</span>
      </div>

      <div className={`audio-wave-visualizer ${waveStateClass}`} aria-hidden="true">
        {waveBars}
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
  )
}
