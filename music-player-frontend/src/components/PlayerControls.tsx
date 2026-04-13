interface PlayerControlsProps {
  onPlay: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
}

export function PlayerControls({
  onPlay,
  onPause,
  onResume,
  onStop,
  onNext,
  onPrevious,
}: PlayerControlsProps) {
  return (
    <div>
      <button type="button" onClick={onPlay}>Play</button>
      <button type="button" onClick={onPause}>Pause</button>
      <button type="button" onClick={onResume}>Resume</button>
      <button type="button" onClick={onStop}>Stop</button>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="button" onClick={onNext}>Next</button>
    </div>
  )
}
