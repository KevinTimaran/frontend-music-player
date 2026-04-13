import type { IThemeStrategy } from './IThemeStrategy'
import type { UITheme } from '../models/UITheme'

/**
 * Estrategia de tema por defecto
 * Clase que proporciona un tema predeterminado
 */
export class DefaultThemeStrategy implements IThemeStrategy {
  generateTheme(): UITheme {
    return {
      id: 'default',
      name: 'Default',
      primaryColor: '#6366f1',
      secondaryColor: '#818cf8',
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      accentColor: '#a78bfa',
    }
  }

  getThemeName(): string {
    return 'Default Theme'
  }
}
