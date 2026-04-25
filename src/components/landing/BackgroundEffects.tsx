export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-black">
      <video src="/28175-368238590.mp4" className="absolute w-full h-full object-cover" autoPlay loop muted playsInline></video>
      <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black via-black/40 to-black/10" />
    </div>
  );
}
