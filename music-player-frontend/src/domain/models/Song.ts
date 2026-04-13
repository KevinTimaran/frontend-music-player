export class Song {
  private readonly id: string
  private readonly title: string
  private readonly artist: string
  private readonly duration: number
  private readonly sourceUrl: string
  private readonly coverUrl: string
  private readonly genre: string

  constructor(
    id: string,
    title: string,
    artist: string,
    duration: number,
    sourceUrl: string,
    coverUrl: string,
    genre: string,
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Song id cannot be null or empty.')
    }

    if (!title || title.trim().length === 0) {
      throw new Error('Song title cannot be null or empty.')
    }

    if (!artist || artist.trim().length === 0) {
      throw new Error('Song artist cannot be null or empty.')
    }

    if (duration < 0) {
      throw new Error('Song duration must be greater than or equal to 0.')
    }

    this.id = id.trim()
    this.title = title.trim()
    this.artist = artist.trim()
    this.duration = duration
    this.sourceUrl = sourceUrl
    this.coverUrl = coverUrl
    this.genre = genre
  }

  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title
  }

  public getArtist(): string {
    return this.artist
  }

  public getDuration(): number {
    return this.duration
  }

  public getSourceUrl(): string {
    return this.sourceUrl
  }

  public getCoverUrl(): string {
    return this.coverUrl
  }

  public getGenre(): string {
    return this.genre
  }

  public getDisplayName(): string {
    return `${this.title} - ${this.artist}`
  }
}
