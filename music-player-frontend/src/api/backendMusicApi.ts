import type { Song } from '../domain/models/Song'

/**
 * API del backend de música
 * Servicio de comunicación con el backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Obtiene todas las canciones del backend
 */
export async function getSongs(): Promise<Song[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs`)
    if (!response.ok) throw new Error('Failed to fetch songs')
    return await response.json()
  } catch (error) {
    console.error('Error fetching songs:', error)
    return []
  }
}

/**
 * Obtiene una canción específica por ID
 */
export async function getSongById(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`)
    if (!response.ok) throw new Error('Failed to fetch song')
    return await response.json()
  } catch (error) {
    console.error('Error fetching song:', error)
    return null
  }
}

/**
 * Crea una nueva canción
 */
export async function createSong(song: Omit<Song, 'id' | 'createdAt'>): Promise<Song | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    })
    if (!response.ok) throw new Error('Failed to create song')
    return await response.json()
  } catch (error) {
    console.error('Error creating song:', error)
    return null
  }
}

/**
 * Actualiza una canción existente
 */
export async function updateSong(id: string, song: Partial<Song>): Promise<Song | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    })
    if (!response.ok) throw new Error('Failed to update song')
    return await response.json()
  } catch (error) {
    console.error('Error updating song:', error)
    return null
  }
}

/**
 * Elimina una canción
 */
export async function deleteSong(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'DELETE',
    })
    return response.ok
  } catch (error) {
    console.error('Error deleting song:', error)
    return false
  }
}
