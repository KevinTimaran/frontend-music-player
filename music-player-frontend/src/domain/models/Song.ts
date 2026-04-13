/**
 * Modelo de canción
 * Interfaz que define la estructura de una canción
 */
export interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number // en segundos
  genre: string
  coverUrl?: string
  audioUrl: string
  createdAt: Date
}
