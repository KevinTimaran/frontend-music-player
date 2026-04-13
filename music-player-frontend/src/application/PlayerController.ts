import { Song } from '../domain/models/Song'
import { UITheme } from '../domain/models/UITheme'
import type { IMusicPlayer } from '../domain/player/IMusicPlayer'
import { Playlist } from '../domain/structures/Playlist'
import type { IThemeStrategy } from '../domain/theme/IThemeStrategy'

export class PlayerController {
  private playlist: Playlist
  private player: IMusicPlayer
  private themeStrategy: IThemeStrategy

  constructor(playlist: Playlist, player: IMusicPlayer, themeStrategy: IThemeStrategy) {
    if (!playlist) {
      throw new Error('Playlist cannot be null or undefined.')
    }

    if (!player) {
      throw new Error('Player cannot be null or undefined.')
    }

    if (!themeStrategy) {
      throw new Error('Theme strategy cannot be null or undefined.')
    }

    this.playlist = playlist
    this.player = player
    this.themeStrategy = themeStrategy
  }

  public addSongToStart(song: Song): void {
    this.playlist.addFirst(song)
  }

  public addSongToEnd(song: Song): void {
    this.playlist.addLast(song)
  }

  public addSongToPosition(song: Song, position: number): void {
    this.playlist.addAt(song, position)
  }

  public deleteSongAt(position: number): void {
    this.playlist.removeAt(position)
  }

  public deleteSongById(songId: string): void {
    this.playlist.removeById(songId)
  }

  public moveSong(from: number, to: number): void {
    this.playlist.move(from, to)
  }

  public playCurrent(): void {
    const song = this.playlist.getCurrentSong()
    if (song) {
      this.player.play(song)
    }
  }

  public playNext(): Song | null {
    const song = this.playlist.nextSong()
    if (song) {
      this.player.play(song)
    }

    return song
  }

  public playPrevious(): Song | null {
    const song = this.playlist.previousSong()
    if (song) {
      this.player.play(song)
    }

    return song
  }

  public pausePlayback(): void {
    this.player.pause()
  }

  public resumePlayback(): void {
    this.player.resume()
  }

  public stopPlayback(): void {
    this.player.stop()
  }

  public selectSong(position: number): Song | null {
    const song = this.playlist.setCurrent(position)
    if (song) {
      this.player.play(song)
    }

    return song
  }

  public getCurrentSong(): Song | null {
    return this.playlist.getCurrentSong()
  }

  public getPlaylistSongs(): Song[] {
    return this.playlist.toArray()
  }

  public getPlayerStatus(): string {
    return this.player.getStatus()
  }

  public changeThemeStrategy(strategy: IThemeStrategy): void {
    if (!strategy) {
      throw new Error('Theme strategy cannot be null or undefined.')
    }

    this.themeStrategy = strategy
  }

  public getThemeForCurrentSong(): UITheme | null {
    const song = this.playlist.getCurrentSong()
    if (!song) {
      return null
    }

    return this.themeStrategy.generateTheme(song)
  }
}
