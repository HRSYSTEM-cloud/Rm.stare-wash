export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070c]">
      {/* Solid deep luxury dark backdrop - No bubbles */}
      <div className="absolute inset-0 bg-[#05070c]" />
      
      {/* Subtle, static elegant vignette at top for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#05070c] to-[#04060a]" />
    </div>
  );
}
