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

  return (
    <div className="playlist-panel panel">
      <h2 className="playlist-title">Playlist</h2>
      {songs.length === 0 ? (
        <p className="empty-playlist">No songs in playlist yet</p>
      ) : (
        <div className="playlist-list">
          {songs.map((song, index) => {
            const rawTarget = targetPositions[index]
            const parsedTarget =
              rawTarget === undefined || rawTarget.trim() === '' ? null : Number(rawTarget)
            const canMove = parsedTarget !== null && !Number.isNaN(parsedTarget)
            const isCurrentSong = song.getId() === currentSongId

            return (
              <div
                key={song.getId()}
                className={`playlist-item ${isCurrentSong ? 'current' : ''}`}
              >
                <div className="playlist-item-info">
                  <div className="playlist-item-title">
                    {song.getTitle()}
                    {isCurrentSong && <span className="current-badge">Now Playing</span>}
                  </div>
                  <div className="playlist-item-artist">{song.getArtist()}</div>
                </div>
                <div className="playlist-actions">
                  <button
                    type="button"
                    className="action-button select-btn"
                    onClick={() => onSelectSong(index)}
                  >
                    Select
                  </button>
                  <button
                    type="button"
                    className="action-button delete-btn"
                    onClick={() => onDeleteSong(index)}
                  >
                    Delete
                  </button>
                  <div className="move-group">
                    <input
                      type="number"
                      placeholder="Pos"
                      className="move-input"
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
                      className={`action-button move-btn ${canMove ? '' : 'disabled'}`}
                      disabled={!canMove}
                      onClick={() => {
                        if (parsedTarget !== null && !Number.isNaN(parsedTarget)) {
                          onMoveSong(index, parsedTarget)
                        }
                      }}
                    >
                      Move
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
