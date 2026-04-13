import { Song } from '../models/Song'

export interface IMusicPlayer {
  play(song: Song): void
  pause(): void
  resume(): void
  stop(): void
  setVolume(volume: number): void
  getStatus(): string
}
