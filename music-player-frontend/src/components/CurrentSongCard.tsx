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

export function CurrentSongCard({ song, status }: CurrentSongCardProps) {
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
      <div className="current-song-status">
        <span className="status-badge">{getStatusDisplay(status)}</span>
      </div>
    </div>
  )
}
