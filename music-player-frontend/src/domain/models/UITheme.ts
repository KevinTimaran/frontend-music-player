export class UITheme {
  private readonly primaryColor: string
  private readonly secondaryColor: string
  private readonly accentColor: string
  private readonly backgroundColor: string

  constructor(
    primaryColor: string,
    secondaryColor: string,
    accentColor: string,
    backgroundColor: string,
  ) {
    if (!primaryColor || primaryColor.trim().length === 0) {
      throw new Error('Primary color cannot be null, undefined or empty.')
    }

    if (!secondaryColor || secondaryColor.trim().length === 0) {
      throw new Error('Secondary color cannot be null, undefined or empty.')
    }

    if (!accentColor || accentColor.trim().length === 0) {
      throw new Error('Accent color cannot be null, undefined or empty.')
    }

    if (!backgroundColor || backgroundColor.trim().length === 0) {
      throw new Error('Background color cannot be null, undefined or empty.')
    }

    this.primaryColor = primaryColor
    this.secondaryColor = secondaryColor
    this.accentColor = accentColor
    this.backgroundColor = backgroundColor
  }

  public getPrimaryColor(): string {
    return this.primaryColor
  }

  public getSecondaryColor(): string {
    return this.secondaryColor
  }

  public getAccentColor(): string {
    return this.accentColor
  }

  public getBackgroundColor(): string {
    return this.backgroundColor
  }
}
