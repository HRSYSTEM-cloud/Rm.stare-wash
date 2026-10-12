interface AnimatedBackgroundProps {
  backgroundImageUrl?: string;
  overlayOpacity?: number; // 0 to 100, default 85
}

export function AnimatedBackground({
  backgroundImageUrl,
  overlayOpacity = 85,
}: AnimatedBackgroundProps) {
  const hasCustomBg = Boolean(backgroundImageUrl?.trim());
  const opacityValue = Math.min(100, Math.max(20, overlayOpacity)) / 100;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070c]">
      {/* 1. Base Dark Luxury Backdrop */}
      <div className="absolute inset-0 bg-[#05070c]" />

      {/* 2. Custom Background Image if added from Admin Panel */}
      {hasCustomBg && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {/* 3. Luxury Darkening Tint Overlay to guarantee text & cards readability */}
      {hasCustomBg && (
        <div
          className="absolute inset-0 bg-black backdrop-blur-[2px] transition-opacity"
          style={{ opacity: opacityValue }}
        />
      )}

      {/* 4. Elegant Vignette & Subtle Blue Radial Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/25 via-[#05070c]/80 to-[#04060a]" />
    </div>
  );
}
