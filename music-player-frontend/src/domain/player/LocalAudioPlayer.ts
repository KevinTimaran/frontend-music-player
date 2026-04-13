import type { IMusicPlayer } from './IMusicPlayer'

/**
 * Reproductor de audio local
 * Clase que implementa el reproductor usando elementos HTML5 Audio
 */
export class LocalAudioPlayer implements IMusicPlayer {
  private audioElement: HTMLAudioElement
  private playing: boolean = false

  constructor() {
    this.audioElement = new Audio()
  }

  play(): void {
    this.audioElement.play()
    this.playing = true
  }

  pause(): void {
    this.audioElement.pause()
    this.playing = false
  }

  stop(): void {
    this.audioElement.pause()
    this.audioElement.currentTime = 0
    this.playing = false
  }

  resume(): void {
    this.audioElement.play()
    this.playing = true
  }

  setVolume(volume: number): void {
    this.audioElement.volume = Math.max(0, Math.min(1, volume))
  }

  setCurrentTime(time: number): void {
    this.audioElement.currentTime = time
  }

  getCurrentTime(): number {
    return this.audioElement.currentTime
  }

  getDuration(): number {
    return this.audioElement.duration
  }

  loadAudio(audioUrl: string): void {
    this.audioElement.src = audioUrl
  }

  isPlaying(): boolean {
    return this.playing && !this.audioElement.paused
  }
}
