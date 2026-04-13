import type { Song } from '../models/Song'
import { SongNode } from './SongNode'

/**
 * Playlist con lista doblemente enlazada
 * Clase que gestiona una playlist de canciones usando estructura de nodos
 */
export class Playlist {
  name: string
  head: SongNode | null = null
  tail: SongNode | null = null
  size: number = 0
  currentNode: SongNode | null = null

  constructor(name: string) {
    this.name = name
  }

  /**
   * Agrega una canción al final de la playlist
   */
  addSong(song: Song): void {
    const newNode = new SongNode(song)
    this.size++
    
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
      this.currentNode = newNode
    } else {
      if (this.tail) {
        this.tail.next = newNode
        newNode.prev = this.tail
      }
      this.tail = newNode
    }
  }

  /**
   * Obtiene todas las canciones como array
   */
  getSongs(): Song[] {
    const songs: Song[] = []
    let current = this.head
    while (current) {
      songs.push(current.song)
      current = current.next
    }
    return songs
  }

  /**
   * Obtiene la canción actual
   */
  getCurrentSong(): Song | null {
    return this.currentNode?.song || null
  }
}
