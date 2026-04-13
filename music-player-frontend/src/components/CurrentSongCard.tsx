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
    PLAYING: '▶️ Playing',
    PAUSED: '⏸️ Paused',
    STOPPED: '⏹️ Stopped',
    RESUMED: '▶️ Resumed',
  }
  return statusMap[status] || status
}

const getPlaybackHeading = (status: string): string => {
  if (status === 'RESUMED') {
    return 'Resumed'
  }

  return 'Now Playing'
}

export function CurrentSongCard({ song, status }: CurrentSongCardProps) {
  const normalizedStatusClass = `status-${status.toLowerCase()}`
  const isPlaybackActive = status === 'PLAYING' || status === 'RESUMED'

  if (!song) {
    return (
      <div className="current-song-card">
        <div className="no-song-placeholder">
          <h2>No song selected</h2>
          <p>Choose a song from the playlist or add a new one</p>
        </div>
      </div>
    )
  }

  return (
    <div className="current-song-card">
      <h2 className="current-song-title">{song.getTitle()}</h2>
      <div className="current-song-meta">
        <div className="meta-row">
          <span className="meta-label">Artist</span>
          <span className="meta-value">{song.getArtist()}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Genre</span>
          <span className="meta-value">{song.getGenre()}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Duration</span>
          <span className="meta-value">{formatDuration(song.getDuration())}</span>
        </div>
      </div>
      {isPlaybackActive && (
        <div className="now-playing-main" role="status" aria-live="polite">
          <div className="now-playing-current">
            <div className="now-playing-icon" aria-hidden="true">
              <div className="now-playing-play" />
            </div>
            <div>
              <p className="now-playing-heading">{getPlaybackHeading(status)}</p>
              <p className="now-playing-song">{song.getTitle()}</p>
              <p className="now-playing-artist">{song.getArtist()}</p>
            </div>
          </div>
          <div className="now-playing-loader" aria-hidden="true">
            <span className="now-load" />
            <span className="now-load" />
            <span className="now-load" />
            <span className="now-load" />
          </div>
        </div>
      )}
      <div className="current-song-status">
        <button
          type="button"
          className={`status-action-button ${normalizedStatusClass}`}
          aria-label={`Current status: ${getStatusDisplay(status)}`}
        >
          <span className="dots_border" />
          <span className="sparkle" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path className="path" d="M12 3.5L13.8 8.2L18.5 10L13.8 11.8L12 16.5L10.2 11.8L5.5 10L10.2 8.2L12 3.5Z" />
              <path className="path" d="M18.5 2.5L19.4 4.8L21.7 5.7L19.4 6.6L18.5 8.9L17.6 6.6L15.3 5.7L17.6 4.8L18.5 2.5Z" />
              <path className="path" d="M4.8 14.4L5.8 17L8.4 18L5.8 19L4.8 21.6L3.8 19L1.2 18L3.8 17L4.8 14.4Z" />
            </svg>
          </span>
          <span className="text_button">{getStatusDisplay(status)}</span>
        </button>
      </div>
    </div>
  )
}
