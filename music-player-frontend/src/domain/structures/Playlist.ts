import { Song } from '../models/Song'
import { SongNode } from './SongNode'

export class Playlist {
  private head: SongNode | null
  private tail: SongNode | null
  private current: SongNode | null
  private size: number

  constructor() {
    this.head = null
    this.tail = null
    this.current = null
    this.size = 0
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public clear(): void {
    this.head = null
    this.tail = null
    this.current = null
    this.size = 0
  }

  public getSize(): number {
    return this.size
  }

  getCurrentSong(): Song | null {
    return this.current ? this.current.getSong() : null
  }

  public getFirstSong(): Song | null {
    return this.head ? this.head.getSong() : null
  }

  public getLastSong(): Song | null {
    return this.tail ? this.tail.getSong() : null
  }

  public addFirst(song: Song): void {
    this.validateSong(song)
    const newNode = new SongNode(song)

    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
      this.current = newNode
    } else {
      newNode.setNext(this.head)
      this.head!.setPrev(newNode)
      this.head = newNode
    }

    this.size += 1
  }

  public addLast(song: Song): void {
    this.validateSong(song)
    const newNode = new SongNode(song)

    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
      this.current = newNode
    } else {
      newNode.setPrev(this.tail)
      this.tail!.setNext(newNode)
      this.tail = newNode
    }

    this.size += 1
  }

  public addAt(song: Song, position: number): void {
    this.validateSong(song)
    this.validatePositionForAdd(position)

    if (position === 0) {
      this.addFirst(song)
      return
    }

    if (position === this.size) {
      this.addLast(song)
      return
    }

    const currentNode = this.getNodeAt(position)
    const previousNode = currentNode!.getPrev()
    const newNode = new SongNode(song)

    newNode.setPrev(previousNode)
    newNode.setNext(currentNode)
    previousNode!.setNext(newNode)
    currentNode!.setPrev(newNode)

    this.size += 1
  }

  public removeAt(position: number): void {
    this.validatePositionForExistingElement(position)

    const nodeToRemove = this.getNodeAt(position)!
    const previousNode = nodeToRemove.getPrev()
    const nextNode = nodeToRemove.getNext()

    if (this.size === 1) {
      this.head = null
      this.tail = null
      this.current = null
    } else if (nodeToRemove === this.head) {
      this.head = nextNode

      if (this.current === nodeToRemove) {
        this.current = nextNode
      }
    } else if (nodeToRemove === this.tail) {
      this.tail = previousNode

      if (this.current === nodeToRemove) {
        this.current = previousNode
      }
    } else {
      previousNode!.setNext(nextNode)
      nextNode!.setPrev(previousNode)

      if (this.current === nodeToRemove) {
        this.current = nextNode ? nextNode : previousNode
      }
    }

    this.size -= 1

    if (this.head) {
      this.head.setPrev(null)
    }

    if (this.tail) {
      this.tail.setNext(null)
    }

    nodeToRemove.setPrev(null)
    nodeToRemove.setNext(null)
  }

  public removeById(songId: string): void {
    this.validateSongId(songId)

    let currentNode = this.head
    let position = 0

    while (currentNode) {
      if (currentNode.getSong().getId() === songId) {
        this.removeAt(position)
        return
      }

      currentNode = currentNode.getNext()
      position += 1
    }
  }

  public move(from: number, to: number): void {
    this.validatePositionForExistingElement(from)
    this.validatePositionForExistingElement(to)

    if (from === to) {
      return
    }

    const nodeToMove = this.getNodeAt(from)!
    const songToMove = nodeToMove.getSong()
    const wasCurrent = this.current === nodeToMove

    this.removeAt(from)
    this.addAt(songToMove, to)

    if (wasCurrent) {
      this.current = this.getNodeAt(to)
    }
  }

  public nextSong(): Song | null {
    if (!this.current) {
      return null
    }

    const next = this.current.getNext()
    if (!next) {
      return null
    }

    this.current = next
    return this.current.getSong()
  }

  public previousSong(): Song | null {
    if (!this.current) {
      return null
    }

    const prev = this.current.getPrev()
    if (!prev) {
      return null
    }

    this.current = prev
    return this.current.getSong()
  }

  public setCurrent(position: number): Song | null {
    const node = this.getNodeAt(position)
    this.current = node
    return this.current ? this.current.getSong() : null
  }

  public contains(songId: string): boolean {
    this.validateSongId(songId)

    let currentNode = this.head

    while (currentNode) {
      if (currentNode.getSong().getId() === songId) {
        return true
      }

      currentNode = currentNode.getNext()
    }

    return false
  }

  public toArray(): Song[] {
    if (this.isEmpty()) {
      return []
    }

    const songs: Song[] = []
    let currentNode = this.head

    while (currentNode) {
      songs.push(currentNode.getSong())
      currentNode = currentNode.getNext()
    }

    return songs
  }

  private getNodeAt(position: number): SongNode | null {
    this.validatePositionForExistingElement(position)

    let currentNode = this.head
    let index = 0

    while (currentNode && index < position) {
      currentNode = currentNode.getNext()
      index += 1
    }

    return currentNode
  }

  private validateSong(song: Song): void {
    if (!song) {
      throw new Error('Song cannot be null.')
    }
  }

  private validateSongId(songId: string): void {
    if (!songId || songId.trim().length === 0) {
      throw new Error('Song id cannot be null or empty.')
    }
  }

  private validatePositionForAdd(position: number): void {
    if (position < 0 || position > this.size) {
      throw new Error('Position out of range for add operation.')
    }
  }

  private validatePositionForExistingElement(position: number): void {
    if (position < 0 || position >= this.size) {
      throw new Error('Position out of range for existing element.')
    }
  }
}
