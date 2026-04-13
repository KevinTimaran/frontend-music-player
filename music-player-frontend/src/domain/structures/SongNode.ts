import { Song } from '../models/Song'

export class SongNode {
  private song: Song
  private prev: SongNode | null
  private next: SongNode | null

  constructor(song: Song) {
    if (!song) {
      throw new Error('Song cannot be null.')
    }

    this.song = song
    this.prev = null
    this.next = null
  }

  public getSong(): Song {
    return this.song
  }

  public getPrev(): SongNode | null {
    return this.prev
  }

  public getNext(): SongNode | null {
    return this.next
  }

  public setPrev(prev: SongNode | null): void {
    this.prev = prev
  }

  public setNext(next: SongNode | null): void {
    this.next = next
  }
}
