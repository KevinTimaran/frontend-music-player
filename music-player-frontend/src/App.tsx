import { SongForm } from './components/SongForm'
import { PlaylistView } from './components/PlaylistView'
import { PlayerControls } from './components/PlayerControls'
import { CurrentSongCard } from './components/CurrentSongCard'
import './App.css'

function App() {
  return (
    <main className="app-container">
      <h1>Music Player</h1>
      
      <section className="app-sections">
        <CurrentSongCard />
        <PlayerControls />
        <PlaylistView />
        <SongForm />
      </section>
    </main>
  )
}

export default App
