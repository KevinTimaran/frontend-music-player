import { useState, type DragEvent } from 'react'
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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (index: number): void => {
    setDraggedIndex(index)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>, index: number): void => {
    event.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetIndex: number): void => {
    event.preventDefault()

    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onMoveSong(draggedIndex, targetIndex)
    }

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDropAtEnd = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()

    if (draggedIndex !== null) {
      onMoveSong(draggedIndex, songs.length)
    }

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = (): void => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div className="playlist-panel panel">
      <h2 className="playlist-title">Playlist</h2>
      {songs.length === 0 ? (
        <p className="empty-playlist">No songs in playlist</p>
      ) : (
        <div className="playlist-list">
          {songs.map((song, index) => {
            const isCurrentSong = song.getId() === currentSongId
            const isDragging = draggedIndex === index
            const isDragOver = dragOverIndex === index

            return (
              <div
                key={song.getId()}
                className={`playlist-item ${isCurrentSong ? 'current' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(event) => handleDragOver(event, index)}
                onDrop={(event) => handleDrop(event, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="playlist-item-info">
                  <div className="playlist-item-title">
                    {song.getTitle()}
                    {isCurrentSong && <span className="current-badge">(Current)</span>}
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
                </div>
              </div>
            )
          })}
          <div
            className={`playlist-drop-zone ${draggedIndex !== null ? 'active' : ''}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDropAtEnd}
          >
            Drop here to move to the end
          </div>
        </div>
      )}
    </div>
  )
}
