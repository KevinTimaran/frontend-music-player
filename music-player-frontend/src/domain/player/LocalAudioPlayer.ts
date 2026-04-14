import { Song } from '../models/Song'
import type { IMusicPlayer } from './IMusicPlayer'

export class LocalAudioPlayer implements IMusicPlayer {
  private currentSong: Song | null
  private volume: number
  private status: string
  private audio: HTMLAudioElement
  private onEndedCallback: (() => void) | null

  constructor() {
    this.currentSong = null
    this.volume = 50
    this.status = 'STOPPED'
    this.onEndedCallback = null
    this.audio = new Audio()
    this.audio.volume = this.volume / 100
    this.audio.addEventListener('ended', () => {
      this.status = 'STOPPED'
      this.currentSong = null

      if (this.onEndedCallback) {
        try {
          this.onEndedCallback()
        } catch (error) {
          console.error('Failed to handle ended playback:', error)
        }
      }
    })
  }

  public play(song: Song): void {
    if (!song) {
      throw new Error('Song cannot be null.')
    }

    const sourceUrl = song.getSourceUrl()
    if (!sourceUrl || sourceUrl.trim().length === 0) {
      throw new Error('Song source URL cannot be empty.')
    }

    if (!this.audio.paused) {
      this.audio.pause()
    }

    this.currentSong = song
    if (this.audio.src !== sourceUrl) {
      this.audio.src = sourceUrl
    }

    this.audio.play().catch((error) => {
      console.error('Failed to play audio:', error)
    })
    this.status = 'PLAYING'
  }

  public pause(): void {
    if (this.status === 'PLAYING') {
      this.audio.pause()
      this.status = 'PAUSED'
    }
  }

  public resume(): void {
    if (this.status === 'PAUSED') {
      this.audio.play().catch((error) => {
        console.error('Failed to resume audio:', error)
      })
      this.status = 'PLAYING'
    }
  }

  public stop(): void {
    this.audio.pause()
    this.audio.currentTime = 0
    this.status = 'STOPPED'
    this.currentSong = null
  }

  public setOnEnded(callback: (() => void) | null): void {
    this.onEndedCallback = callback
  }

  public setVolume(volume: number): void {
    if (volume < 0 || volume > 100) {
      throw new Error('Volume must be between 0 and 100.')
    }

    this.volume = volume
    this.audio.volume = volume / 100
  }

  public getStatus(): string {
    return this.status
  }

  public getCurrentSong(): Song | null {
    return this.currentSong
  }

  public getCurrentTime(): number {
    return Number.isFinite(this.audio.currentTime) ? this.audio.currentTime : 0
  }

  public getDuration(): number {
    if (Number.isFinite(this.audio.duration) && this.audio.duration > 0) {
      return this.audio.duration
    }

    if (this.currentSong) {
      return this.currentSong.getDuration()
    }

    return 0
  }

  public seekTo(seconds: number): void {
    if (!Number.isFinite(seconds)) {
      return
    }

    const maxDuration = this.getDuration()
    const clampedSeconds = Math.max(0, maxDuration > 0 ? Math.min(seconds, maxDuration) : seconds)
    this.audio.currentTime = clampedSeconds
  }

  public getVolume(): number {
    return this.volume
  }
}
