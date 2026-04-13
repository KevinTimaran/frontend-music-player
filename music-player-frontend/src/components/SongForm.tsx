import { useState } from 'react'
import { Song } from '../domain/models/Song'

interface SongFormProps {
  onAddToStart: (song: Song) => void
  onAddToEnd: (song: Song) => void
  onAddToPosition: (song: Song, position: number) => void
}

export function SongForm({ onAddToStart, onAddToEnd, onAddToPosition }: SongFormProps) {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [duration, setDuration] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [genre, setGenre] = useState('')
  const [position, setPosition] = useState('')
  const [error, setError] = useState('')

  const clearForm = (): void => {
    setId('')
    setTitle('')
    setArtist('')
    setDuration('')
    setSourceUrl('')
    setCoverUrl('')
    setGenre('')
    setPosition('')
    setError('')
  }

  const buildSong = (): Song => {
    return new Song(
      id,
      title,
      artist,
      Number(duration),
      sourceUrl,
      coverUrl,
      genre,
    )
  }

  const handleAddToStart = (): void => {
    try {
      const song = buildSong()
      onAddToStart(song)
      clearForm()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Invalid song data.')
    }
  }

  const handleAddToEnd = (): void => {
    try {
      const song = buildSong()
      onAddToEnd(song)
      clearForm()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Invalid song data.')
    }
  }

  const handleAddToPosition = (): void => {
    try {
      const song = buildSong()
      onAddToPosition(song, Number(position))
      clearForm()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Invalid song data.')
    }
  }

  return (
    <div className="song-form-panel panel">
      <h2 className="form-title">Add Song</h2>
      
      <div className="form-section">
        <h3 className="section-title">Song Details</h3>
        <div className="song-form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="song-id">ID *</label>
            <input
              id="song-id"
              type="text"
              className="form-input"
              placeholder="e.g., song-001"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="song-title">Title *</label>
            <input
              id="song-title"
              type="text"
              className="form-input"
              placeholder="Song title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="song-artist">Artist *</label>
            <input
              id="song-artist"
              type="text"
              className="form-input"
              placeholder="Artist name"
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="song-genre">Genre</label>
            <input
              id="song-genre"
              type="text"
              className="form-input"
              placeholder="e.g., Rock, Pop"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="song-duration">Duration (seconds) *</label>
            <input
              id="song-duration"
              type="number"
              className="form-input"
              placeholder="180"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="song-source">Source URL *</label>
            <input
              id="song-source"
              type="text"
              className="form-input"
              placeholder="https://..."
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label" htmlFor="song-cover">Cover URL</label>
            <input
              id="song-cover"
              type="text"
              className="form-input"
              placeholder="https://..."
              value={coverUrl}
              onChange={(event) => setCoverUrl(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Position</h3>
        <div className="form-group">
          <label className="form-label" htmlFor="song-position">Add at Position (optional)</label>
          <input
            id="song-position"
            type="number"
            className="form-input"
            placeholder="Leave empty to add at end"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="button" className="form-button primary" onClick={handleAddToStart}>
          Add to Start
        </button>
        <button type="button" className="form-button primary" onClick={handleAddToEnd}>
          Add to End
        </button>
        <button type="button" className="form-button secondary" onClick={handleAddToPosition}>
          Add to Position
        </button>
      </div>
    </div>
  )
}
