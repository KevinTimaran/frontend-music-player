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

export function CurrentSongCard({ song, status }: CurrentSongCardProps) {
  if (!song) {
    return (
      <div>
        <h3>No song selected</h3>
        <p>Status: {status}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>{song.getTitle()}</h3>
      <p>Artist: {song.getArtist()}</p>
      <p>Genre: {song.getGenre()}</p>
      <p>Duration: {formatDuration(song.getDuration())}</p>
      <p>Status: {status}</p>
    </div>
  )
}
