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
    <div>
      <input
        type="text"
        placeholder="Id"
        value={id}
        onChange={(event) => setId(event.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
      />
      <input
        type="number"
        placeholder="Duration"
        value={duration}
        onChange={(event) => setDuration(event.target.value)}
      />
      <input
        type="text"
        placeholder="Source URL"
        value={sourceUrl}
        onChange={(event) => setSourceUrl(event.target.value)}
      />
      <input
        type="text"
        placeholder="Cover URL"
        value={coverUrl}
        onChange={(event) => setCoverUrl(event.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      />
      <input
        type="number"
        placeholder="Position"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
      />
      <button type="button" onClick={handleAddToStart}>
        Add to Start
      </button>
      <button type="button" onClick={handleAddToEnd}>
        Add to End
      </button>
      <button type="button" onClick={handleAddToPosition}>
        Add to Position
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
