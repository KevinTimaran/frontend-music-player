/**
 * Interfaz para el reproductor de música
 * Define el contrato que debe cumplir cualquier implementación de reproductor
 */
export interface IMusicPlayer {
  play(): void
  pause(): void
  stop(): void
  resume(): void
  setVolume(volume: number): void
  setCurrentTime(time: number): void
  getCurrentTime(): number
  getDuration(): number
  loadAudio(audioUrl: string): void
  isPlaying(): boolean
}
