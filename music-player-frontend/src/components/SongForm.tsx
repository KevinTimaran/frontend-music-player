import { useRef, useState, type ChangeEvent } from 'react'
import { Song } from '../domain/models/Song'

interface SongFormProps {
  onAddManyToStart: (songs: Song[]) => void
  onAddManyToEnd: (songs: Song[]) => void
}

const audioExtensions = new Set([
  '.mp3',
  '.wav',
  '.ogg',
  '.aac',
  '.m4a',
  '.flac',
  '.webm',
])

const folderInputAttributes = {
  webkitdirectory: '',
  directory: '',
} as unknown as Record<string, string>

const getFileNameWithoutExtension = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex <= 0) {
    return fileName
  }

  return fileName.slice(0, lastDotIndex)
}

const isAudioFile = (file: File): boolean => {
  if (file.type.startsWith('audio/')) {
    return true
  }

  const lowerCaseName = file.name.toLowerCase()
  return Array.from(audioExtensions).some((extension) => lowerCaseName.endsWith(extension))
}

const mergeUniqueFiles = (existingFiles: File[], incomingFiles: File[]): File[] => {
  const map = new Map<string, File>()
  const toKey = (file: File): string => `${file.name}-${file.size}-${file.lastModified}`

  existingFiles.forEach((file) => map.set(toKey(file), file))
  incomingFiles.forEach((file) => map.set(toKey(file), file))

  return Array.from(map.values())
}

const getAudioDurationInSeconds = (sourceUrl: string): Promise<number> => {
  return new Promise((resolve) => {
    const audio = new Audio()
    audio.preload = 'metadata'

    const cleanup = (): void => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('error', onError)
      audio.src = ''
    }

    const onLoadedMetadata = (): void => {
      const duration = Number.isFinite(audio.duration) ? Math.max(0, Math.round(audio.duration)) : 0
      cleanup()
      resolve(duration)
    }

    const onError = (): void => {
      cleanup()
      resolve(0)
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('error', onError)
    audio.src = sourceUrl
  })
}

export function SongForm({
  onAddManyToStart,
  onAddManyToEnd,
}: SongFormProps) {
  const [selectedAudioFiles, setSelectedAudioFiles] = useState<File[]>([])
  const [error, setError] = useState('')

  const filesInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelection = (event: ChangeEvent<HTMLInputElement>): void => {
    const fileList = event.target.files
    const incomingFiles = fileList ? Array.from(fileList).filter(isAudioFile) : []

    setSelectedAudioFiles((previousFiles) => mergeUniqueFiles(previousFiles, incomingFiles))
    setError('')
  }

  const buildSongFromFile = async (file: File, index: number): Promise<Song> => {
    const generatedSourceUrl = URL.createObjectURL(file)
    const generatedDuration = await getAudioDurationInSeconds(generatedSourceUrl)
    const normalizedFileName = file.name.replace(/\s+/g, '-').toLowerCase()

    const generatedId = `${Date.now()}-${index}-${normalizedFileName}`
    const mappedTitle = getFileNameWithoutExtension(file.name)
    const mappedArtist = 'Unknown Artist'
    const mappedGenre = 'Unknown'

    return new Song(
      generatedId,
      mappedTitle,
      mappedArtist,
      generatedDuration,
      generatedSourceUrl,
      '',
      mappedGenre,
    )
  }

  const buildSongsFromSelection = async (): Promise<Song[]> => {
    if (selectedAudioFiles.length === 0) {
      throw new Error('Select at least one audio file or folder with audio files.')
    }

    return await Promise.all(
      selectedAudioFiles.map(async (file, index) => await buildSongFromFile(file, index)),
    )
  }

  const clearForm = (): void => {
    setSelectedAudioFiles([])
    setError('')

    if (filesInputRef.current) {
      filesInputRef.current.value = ''
    }

    if (folderInputRef.current) {
      folderInputRef.current.value = ''
    }
  }

  const handleAddFilesToStart = async (): Promise<void> => {
    try {
      const songs = await buildSongsFromSelection()
      onAddManyToStart(songs)
      clearForm()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to process files.')
    }
  }

  const handleAddFilesToEnd = async (): Promise<void> => {
    try {
      const songs = await buildSongsFromSelection()
      onAddManyToEnd(songs)
      clearForm()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to process files.')
    }
  }

  return (
    <div className="song-form-panel panel">
      <h2 className="form-title">Add Song</h2>

      <div className="form-section file-upload-section">
        <h3 className="section-title">Local Audio Files</h3>
        <div className="song-form-grid">
          <div className="form-group full-width">
            <label className="form-label" htmlFor="audio-files">Select audio files</label>
            <input
              ref={filesInputRef}
              id="audio-files"
              type="file"
              className="form-input form-file-input"
              accept="audio/*"
              multiple
              onChange={handleFilesSelection}
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label" htmlFor="audio-folder">Select folder</label>
            <input
              ref={folderInputRef}
              id="audio-folder"
              type="file"
              className="form-input form-file-input"
              accept="audio/*"
              multiple
              {...folderInputAttributes}
              onChange={handleFilesSelection}
            />
          </div>
        </div>

        <p className="file-count">Selected valid audio files: {selectedAudioFiles.length}</p>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="button" className="form-button primary" onClick={handleAddFilesToStart}>
          Add Files to Start
        </button>
        <button type="button" className="form-button primary" onClick={handleAddFilesToEnd}>
          Add Files to End
        </button>
      </div>
    </div>
  )
}
