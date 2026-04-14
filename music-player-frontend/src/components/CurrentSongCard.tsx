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
  const visualStateClass = isPlaybackActive ? 'playing' : status === 'PAUSED' ? 'paused' : 'stopped'
  const ringHeights = [18, 32, 56, 28, 62, 44, 72, 36, 54, 68, 30, 60, 40, 52, 34, 66, 42, 58]

  if (!song) {
    return (
      <div className="current-song-card current-song-empty">
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
    <div className={`current-song-card current-song-card-${visualStateClass}`}>
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
  )
}
