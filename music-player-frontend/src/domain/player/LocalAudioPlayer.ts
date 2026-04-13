import { Song } from '../models/Song'
import type { IMusicPlayer } from './IMusicPlayer'

export class LocalAudioPlayer implements IMusicPlayer {
  private currentSong: Song | null
  private volume: number
  private status: string

  constructor() {
    this.currentSong = null
    this.volume = 50
    this.status = 'STOPPED'
  }

  public play(song: Song): void {
    if (!song) {
      throw new Error('Song cannot be null.')
    }

    this.currentSong = song
    this.status = 'PLAYING'
  }

  public pause(): void {
    if (this.status === 'PLAYING') {
      this.status = 'PAUSED'
    }
  }

  public resume(): void {
    if (this.status === 'PAUSED') {
      this.status = 'PLAYING'
    }
  }

  public stop(): void {
    this.status = 'STOPPED'
    this.currentSong = null
  }

  public setVolume(volume: number): void {
    if (volume < 0 || volume > 100) {
      throw new Error('Volume must be between 0 and 100.')
    }

    this.volume = volume
  }

  public getStatus(): string {
    return this.status
  }

  public getCurrentSong(): Song | null {
    return this.currentSong
  }

  public getVolume(): number {
    return this.volume
  }
}
