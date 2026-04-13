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
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light')

  const refreshUI = (): void => {
    const refreshedSongs = controller.getPlaylistSongs()
    const refreshedCurrentSong = controller.getCurrentSong()
    const refreshedStatus = controller.getPlayerStatus()

    setSongs(refreshedSongs)
    setCurrentSong(refreshedCurrentSong)
    setStatus(refreshedStatus)
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

  const toggleTheme = (): void => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`app-shell ${themeMode}`}>
      <header className="app-header">
        <div className="app-header-text">
          <h1>Music Player</h1>
          <p className="app-subtitle">Manage and enjoy your music</p>
        </div>
        <div className="theme-switch-wrapper">
          <span className="theme-toggle-caption">
            {themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <label className="theme-switch" aria-label="Toggle light and dark mode">
            <input
              type="checkbox"
              className="theme-switch__checkbox"
              checked={themeMode === 'dark'}
              onChange={toggleTheme}
            />
            <div className="theme-switch__container">
              <div className="theme-switch__stars-container" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.5L13.6 6.5L17.5 8.1L13.6 9.7L12 13.6L10.4 9.7L6.5 8.1L10.4 6.5L12 2.5Z" />
                  <path d="M18.5 12L19.3 14L21.3 14.8L19.3 15.6L18.5 17.6L17.7 15.6L15.7 14.8L17.7 14L18.5 12Z" />
                  <path d="M5.5 13.5L6.3 15.5L8.3 16.3L6.3 17.1L5.5 19.1L4.7 17.1L2.7 16.3L4.7 15.5L5.5 13.5Z" />
                </svg>
              </div>
              <div className="theme-switch__clouds" aria-hidden="true" />
              <div className="theme-switch__circle-container" aria-hidden="true">
                <div className="theme-switch__sun-moon-container">
                  <div className="theme-switch__moon">
                    <div className="theme-switch__spot" />
                    <div className="theme-switch__spot" />
                    <div className="theme-switch__spot" />
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </header>

      <div className="app-layout">
        <aside className="left-column">
          <PlaylistView
            songs={songs}
            currentSongId={currentSong ? currentSong.getId() : null}
            onSelectSong={handleSelectSong}
            onDeleteSong={handleDeleteSong}
            onMoveSong={handleMoveSong}
          />
        </aside>

        <main className="right-column">
          <CurrentSongCard song={currentSong} status={status} />
          <PlayerControls
            onPlay={handlePlay}
            onPause={handlePause}
            onResume={handleResume}
            onStop={handleStop}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
          <SongForm
            onAddToStart={handleAddToStart}
            onAddToEnd={handleAddToEnd}
            onAddToPosition={handleAddToPosition}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </main>
      </div>
    </div>
  )
}

export default App
