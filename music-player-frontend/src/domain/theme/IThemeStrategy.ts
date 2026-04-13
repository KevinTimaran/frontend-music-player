import type { UITheme } from '../models/UITheme'
import type { Song } from '../models/Song'

/**
 * Interfaz Strategy para temas
 * Define el contrato para diferentes estrategias de generación de temas
 */
export interface IThemeStrategy {
  generateTheme(song?: Song): UITheme
  getThemeName(): string
}
