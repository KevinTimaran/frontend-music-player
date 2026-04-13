import type { Song } from '../models/Song'

/**
 * Nodo para lista doblemente enlazada
 * Clase que representa un nodo en la estructura de playlist
 */
export class SongNode {
  song: Song
  next: SongNode | null = null
  prev: SongNode | null = null

  constructor(song: Song) {
    this.song = song
  }
}
