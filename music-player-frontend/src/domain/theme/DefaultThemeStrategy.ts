import { Song } from '../models/Song'
import { UITheme } from '../models/UITheme'
import type { IThemeStrategy } from './IThemeStrategy'

export class DefaultThemeStrategy implements IThemeStrategy {
  public generateTheme(song: Song): UITheme {
    if (!song) {
      throw new Error('Song cannot be null.')
    }

    return new UITheme('#1DB954', '#191414', '#FFFFFF', '#121212')
  }
}
