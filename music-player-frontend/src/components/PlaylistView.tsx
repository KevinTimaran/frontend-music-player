import { useState } from 'react'
import { Song } from '../domain/models/Song'

interface PlaylistViewProps {
  songs: Song[]
  currentSongId: string | null
  onSelectSong: (index: number) => void
  onDeleteSong: (index: number) => void
  onMoveSong: (from: number, to: number) => void
}

export function PlaylistView({
  songs,
  currentSongId,
  onSelectSong,
  onDeleteSong,
  onMoveSong,
}: PlaylistViewProps) {
  const [targetPositions, setTargetPositions] = useState<Record<number, string>>({})

  if (songs.length === 0) {
    return <p>No songs in playlist</p>
  }

  return (
    <ul>
      {songs.map((song, index) => {
        const rawTarget = targetPositions[index]
        const parsedTarget =
          rawTarget === undefined || rawTarget.trim() === '' ? null : Number(rawTarget)
        const canMove = parsedTarget !== null && !Number.isNaN(parsedTarget)

        return (
          <li
            key={song.getId()}
            className={song.getId() === currentSongId ? 'current-song' : ''}
          >
            <span>
              {song.getTitle()} - {song.getArtist()}{' '}
              {song.getId() === currentSongId ? '(Current)' : ''}
            </span>
            <button type="button" onClick={() => onSelectSong(index)}>
              Select
            </button>
            <button type="button" onClick={() => onDeleteSong(index)}>
              Delete
            </button>
            <input
              type="number"
              placeholder="To"
              value={targetPositions[index] ?? ''}
              onChange={(event) =>
                setTargetPositions((previous) => ({
                  ...previous,
                  [index]: event.target.value,
                }))
              }
            />
            <button
              type="button"
              disabled={!canMove}
              onClick={() => {
                if (parsedTarget !== null && !Number.isNaN(parsedTarget)) {
                  onMoveSong(index, parsedTarget)
                }
              }}
            >
              Move
            </button>
          </li>
        )
      })}
    </ul>
  )
}
