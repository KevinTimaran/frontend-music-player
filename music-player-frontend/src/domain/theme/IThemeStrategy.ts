import { Song } from '../models/Song'
import { UITheme } from '../models/UITheme'

export interface IThemeStrategy {
  generateTheme(song: Song): UITheme
}
