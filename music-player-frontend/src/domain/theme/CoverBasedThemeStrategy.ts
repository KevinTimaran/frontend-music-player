import { Song } from '../models/Song'
import { UITheme } from '../models/UITheme'
import type { IThemeStrategy } from './IThemeStrategy'

export class CoverBasedThemeStrategy implements IThemeStrategy {
  public generateTheme(song: Song): UITheme {
    if (!song) {
      throw new Error('Song cannot be null.')
    }

    return new UITheme('#00B8D4', '#263238', '#FFAB00', '#102027')
  }
}
