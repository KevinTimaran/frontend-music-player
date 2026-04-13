import type { IThemeStrategy } from './IThemeStrategy'
import type { UITheme } from '../models/UITheme'
import type { Song } from '../models/Song'

/**
 * Estrategia de tema basada en portada
 * Clase que genera temas extrayendo colores de la portada de la canción
 */
export class CoverBasedThemeStrategy implements IThemeStrategy {
  generateTheme(song?: Song): UITheme {
    // Placeholder: en implementación real, extraería colores de la portada
    const primaryColor = song?.coverUrl ? this.extractColorFromCover(song.coverUrl) : '#6366f1'

    return {
      id: `cover-${song?.id || 'default'}`,
      name: 'Cover Based',
      primaryColor,
      secondaryColor: '#818cf8',
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      accentColor: primaryColor,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private extractColorFromCover(_coverUrl: string): string {
    // Placeholder para extracción de color
    // En implementación real, usaría canvas o librería de análisis de color
    return '#6366f1'
  }

  getThemeName(): string {
    return 'Cover Based Theme'
  }
}
