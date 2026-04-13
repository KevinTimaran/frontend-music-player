import type { IMusicPlayer } from '../domain/player/IMusicPlayer'
import type { Playlist } from '../domain/structures/Playlist'
import type { IThemeStrategy } from '../domain/theme/IThemeStrategy'

/**
 * Controlador del reproductor
 * Clase que orquesta la lógica de reproducción y playlist
 */
export class PlayerController {
  private player: IMusicPlayer | null = null
  private playlist: Playlist | null = null
  private themeStrategy: IThemeStrategy | null = null

  constructor(
    player?: IMusicPlayer,
    playlist?: Playlist,
    themeStrategy?: IThemeStrategy
  ) {
    this.player = player || null
    this.playlist = playlist || null
    this.themeStrategy = themeStrategy || null
  }

  setPlayer(player: IMusicPlayer): void {
    this.player = player
  }

  setPlaylist(playlist: Playlist): void {
    this.playlist = playlist
  }

  setThemeStrategy(strategy: IThemeStrategy): void {
    this.themeStrategy = strategy
  }

  getThemeStrategy(): IThemeStrategy | null {
    return this.themeStrategy
  }

  playCurrentSong(): void {
    if (this.player && this.playlist) {
      const song = this.playlist.getCurrentSong()
      if (song) {
        this.player.loadAudio(song.audioUrl)
        this.player.play()
      }
    }
  }

  pauseSong(): void {
    this.player?.pause()
  }

  nextSong(): void {
    // Placeholder para lógica de siguiente canción
  }

  previousSong(): void {
    // Placeholder para lógica de canción anterior
  }
}
