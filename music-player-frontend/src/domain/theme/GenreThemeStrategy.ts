import type { IThemeStrategy } from './IThemeStrategy'
import type { UITheme } from '../models/UITheme'
import type { Song } from '../models/Song'

/**
 * Estrategia de tema basada en género
 * Clase que genera temas según el género de la canción
 */
export class GenreThemeStrategy implements IThemeStrategy {
  private genreColors: Record<string, { primary: string; secondary: string }> = {
    'rock': { primary: '#dc2626', secondary: '#f87171' },
    'pop': { primary: '#ec4899', secondary: '#f472b6' },
    'jazz': { primary: '#0891b2', secondary: '#06b6d4' },
    'classical': { primary: '#7c3aed', secondary: '#a78bfa' },
    'electronic': { primary: '#22c55e', secondary: '#86efac' },
    'default': { primary: '#6366f1', secondary: '#818cf8' },
  }

  generateTheme(song?: Song): UITheme {
    const genre = song?.genre?.toLowerCase() || 'default'
    const colors = this.genreColors[genre] || this.genreColors['default']

    return {
      id: `genre-${genre}`,
      name: `${genre} Theme`,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      accentColor: colors.secondary,
    }
  }

  getThemeName(): string {
    return 'Genre Theme'
  }
}
