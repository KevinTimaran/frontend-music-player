import { useEffect, useMemo, useState } from 'react'
import { Playlist } from './domain/structures/Playlist'
import { LocalAudioPlayer } from './domain/player/LocalAudioPlayer'
import { DefaultThemeStrategy } from './domain/theme/DefaultThemeStrategy'
import { PlayerController } from './application/PlayerController'
import { Song } from './domain/models/Song'
import { CurrentSongCard } from './components/CurrentSongCard'
import { PlayerControls } from './components/PlayerControls'
import { PlaylistView } from './components/PlaylistView'
import { SongForm } from './components/SongForm'
import './App.css'

function App() {
  const playlist = useMemo(() => new Playlist(), [])
  const player = useMemo(() => new LocalAudioPlayer(), [])
  const themeStrategy = useMemo(() => new DefaultThemeStrategy(), [])
  const controller = useMemo(
    () => new PlayerController(playlist, player, themeStrategy),
    [playlist, player, themeStrategy],
  )

  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [status, setStatus] = useState<string>('STOPPED')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [themeColors, setThemeColors] = useState({
    backgroundColor: '#121212',
    primaryColor: '#1DB954',
    accentColor: '#FFFFFF',
  })

  const refreshUI = (): void => {
    const refreshedSongs = controller.getPlaylistSongs()
    const refreshedCurrentSong = controller.getCurrentSong()
    const refreshedStatus = controller.getPlayerStatus()
    const theme = controller.getThemeForCurrentSong()

    setSongs(refreshedSongs)
    setCurrentSong(refreshedCurrentSong)
    setStatus(refreshedStatus)

    if (theme) {
      setThemeColors({
        backgroundColor: theme.getBackgroundColor(),
        primaryColor: theme.getPrimaryColor(),
        accentColor: theme.getAccentColor(),
      })
      return
    }

    setThemeColors({
      backgroundColor: '#121212',
      primaryColor: '#1DB954',
      accentColor: '#FFFFFF',
    })
  }

  useEffect(() => {
    refreshUI()
  }, [controller])

  const handleAddToStart = (song: Song): void => {
    try {
      controller.addSongToStart(song)
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleAddToEnd = (song: Song): void => {
    try {
      controller.addSongToEnd(song)
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleAddToPosition = (song: Song, position: number): void => {
    try {
      controller.addSongToPosition(song, position)
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handlePlay = (): void => {
    try {
      controller.playCurrent()
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handlePause = (): void => {
    try {
      controller.pausePlayback()
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleResume = (): void => {
    try {
      controller.resumePlayback()
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleStop = (): void => {
    try {
      controller.stopPlayback()
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleNext = (): void => {
    try {
      controller.playNext()
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handlePrevious = (): void => {
    try {
      controller.playPrevious()
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleSelectSong = (index: number): void => {
    try {
      controller.selectSong(index)
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleDeleteSong = (index: number): void => {
    try {
      controller.deleteSongAt(index)
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleMoveSong = (from: number, to: number): void => {
    try {
      controller.moveSong(from, to)
      setErrorMessage('')
      refreshUI()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  return (
    <main
      style={{
        backgroundColor: themeColors.backgroundColor,
        color: themeColors.accentColor,
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <h1>Music Player</h1>

      <CurrentSongCard song={currentSong} status={status} />
      <PlayerControls
        onPlay={handlePlay}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <PlaylistView
        songs={songs}
        currentSongId={currentSong ? currentSong.getId() : null}
        onSelectSong={handleSelectSong}
        onDeleteSong={handleDeleteSong}
        onMoveSong={handleMoveSong}
      />
      <SongForm
        onAddToStart={handleAddToStart}
        onAddToEnd={handleAddToEnd}
        onAddToPosition={handleAddToPosition}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </main>
  )
}

export default App
