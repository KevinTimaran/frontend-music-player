import { Song } from '../models/Song'
import { UITheme } from '../models/UITheme'
import type { IThemeStrategy } from './IThemeStrategy'

export class GenreThemeStrategy implements IThemeStrategy {
  public generateTheme(song: Song): UITheme {
    if (!song) {
      throw new Error('Song cannot be null.')
    }

    const genre = song.getGenre()

    if (!genre || genre.trim().length === 0) {
      return new UITheme('#1DB954', '#191414', '#FFFFFF', '#121212')
    }

    const normalizedGenre = genre.trim().toLowerCase()

    if (normalizedGenre === 'rock') {
      return new UITheme('#B71C1C', '#212121', '#FF5252', '#121212')
    }

    if (normalizedGenre === 'pop') {
      return new UITheme('#EC407A', '#7B1FA2', '#F8BBD0', '#FCE4EC')
    }

    if (normalizedGenre === 'jazz') {
      return new UITheme('#8D6E63', '#3E2723', '#D7CCC8', '#EFEBE9')
    }

    return new UITheme('#1DB954', '#191414', '#FFFFFF', '#121212')
  }
}
