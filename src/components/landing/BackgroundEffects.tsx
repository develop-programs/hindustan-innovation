export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <video src="/28175-368238590.mp4" autoPlay loop muted></video>
      <div className="absolute inset-0 w-full h-full bg-black/70" />
    </div>
  );
}
