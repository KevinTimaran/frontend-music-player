import { Song } from '../domain/models/Song'

type RawSong = {
  id: string
  title: string
  artist: string
  duration: number
  sourceUrl: string
  coverUrl: string
  genre: string
}

export type Theme = {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
}

const BACKEND_BASE_URL =
  (import.meta.env.VITE_BACKEND_URL as string | undefined)?.trim() ||
  'https://backend-music-player-r9vn.onrender.com/api/player'

function mapSong(raw: RawSong): Song {
  return new Song(
    raw.id,
    raw.title,
    raw.artist,
    raw.duration,
    raw.sourceUrl,
    raw.coverUrl,
    raw.genre,
  )
}

function toRawSong(song: Song): RawSong {
  return {
    id: song.getId(),
    title: song.getTitle(),
    artist: song.getArtist(),
    duration: song.getDuration(),
    sourceUrl: song.getSourceUrl(),
    coverUrl: song.getCoverUrl(),
    genre: song.getGenre(),
  }
}

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${BACKEND_BASE_URL}${normalizedPath}`
}

async function ensureOk(response: Response, context: string): Promise<void> {
  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    const errorSuffix = errorBody.trim().length > 0 ? `: ${errorBody}` : ''
    throw new Error(`${context}${errorSuffix}`)
  }
}

async function parseBody<T>(response: Response): Promise<T | null> {
  if (response.status === 204) {
    return null
  }

  const body = await response.text()
  if (!body.trim()) {
    return null
  }

  try {
    return JSON.parse(body) as T
  } catch {
    return body as T
  }
}

async function parseRawSongOrNull(response: Response): Promise<Song | null> {
  const payload = await parseBody<RawSong | null>(response)
  return payload ? mapSong(payload) : null
}

async function parseSongs(response: Response): Promise<Song[]> {
  const payload = await parseBody<RawSong[]>(response)
  if (!payload || !Array.isArray(payload)) {
    return []
  }

  return payload.map(mapSong)
}

async function requestSong(method: 'POST', path: string): Promise<Song | null> {
  const response = await fetch(buildUrl(path), { method })
  await ensureOk(response, `Failed to ${path}`)
  return parseRawSongOrNull(response)
}

export const backendMusicApi = {
  async fetchSongs(): Promise<Song[]> {
    const response = await fetch(buildUrl('/songs'))
    await ensureOk(response, 'Failed to fetch songs')
    return parseSongs(response)
  },

  async fetchCurrentSong(): Promise<Song | null> {
    const response = await fetch(buildUrl('/current'))
    await ensureOk(response, 'Failed to fetch current song')
    return parseRawSongOrNull(response)
  },

  async fetchPlayerStatus(): Promise<string> {
    const response = await fetch(buildUrl('/status'))
    await ensureOk(response, 'Failed to fetch player status')

    const payload = (await parseBody<{ status?: string } | string>(response)) as
      | { status?: string }
      | string
      | null

    if (typeof payload === 'string') {
      return payload
    }

    return payload?.status ?? 'STOPPED'
  },

  async fetchTheme(): Promise<Theme | null> {
    const response = await fetch(buildUrl('/theme'))
    await ensureOk(response, 'Failed to fetch theme')

    return await parseBody<Theme>(response)
  },

  async playCurrent(): Promise<void> {
    const response = await fetch(buildUrl('/play'), {
      method: 'POST',
    })
    await ensureOk(response, 'Failed to play current song')
  },

  async playNext(): Promise<Song | null> {
    return requestSong('POST', '/next')
  },

  async playPrevious(): Promise<Song | null> {
    return requestSong('POST', '/previous')
  },

  async pausePlayback(): Promise<void> {
    const response = await fetch(buildUrl('/pause'), {
      method: 'POST',
    })
    await ensureOk(response, 'Failed to pause playback')
  },

  async resumePlayback(): Promise<void> {
    const response = await fetch(buildUrl('/resume'), {
      method: 'POST',
    })
    await ensureOk(response, 'Failed to resume playback')
  },

  async stopPlayback(): Promise<void> {
    const response = await fetch(buildUrl('/stop'), {
      method: 'POST',
    })
    await ensureOk(response, 'Failed to stop playback')
  },

  async addSongToStart(song: Song): Promise<void> {
    const response = await fetch(buildUrl('/songs/start'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toRawSong(song)),
    })
    await ensureOk(response, 'Failed to add song to start')
  },

  async addSongToEnd(song: Song): Promise<void> {
    const response = await fetch(buildUrl('/songs/end'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toRawSong(song)),
    })
    await ensureOk(response, 'Failed to add song to end')
  },

  async deleteSongById(songId: string): Promise<void> {
    const response = await fetch(buildUrl(`/songs/${encodeURIComponent(songId)}`), {
      method: 'DELETE',
    })
    await ensureOk(response, 'Failed to delete song')
  },
}
