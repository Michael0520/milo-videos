import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

// Mini SVG icons for badges
const BookIconSmall: React.FC<{ color: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const SyncIconSmall: React.FC<{ color: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const RocketIconSmall: React.FC<{ color: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
);

const GlobeIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/**
 * Ending scene - Call to action & website link
 * Duration: 3 seconds (90 frames @ 30fps)
 *
 * Features:
 * - "Visit Our Documentation" CTA
 * - Website URL: moxa-working-group.vercel.app
 * - Celebratory animations
 */
export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      {/* Background gradient burst */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 40%)
          `,
        }}
      />

      {/* Firework particles */}
      {Array.from({ length: 5 }).map((_, fireworkIndex) => {
        const fireworkDelay = fireworkIndex * 12;
        const fireworkProgress = interpolate(
          frame - fireworkDelay,
          [0, 40],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const fireworkX = 20 + (fireworkIndex * 47) % 60;
        const fireworkY = 20 + (fireworkIndex * 31) % 40;
        const colors = ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#ef4444"];
        const color = colors[fireworkIndex];

        return Array.from({ length: 12 }).map((_, particleIndex) => {
          const angle = (particleIndex / 12) * Math.PI * 2;
          const distance = fireworkProgress * 80;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          const particleOpacity = interpolate(
            fireworkProgress,
            [0, 0.3, 1],
            [0, 1, 0]
          );

          return (
            <div
              key={`firework-${fireworkIndex}-${particleIndex}`}
              style={{
                position: "absolute",
                left: `calc(${fireworkX}% + ${x}px)`,
                top: `calc(${fireworkY}% + ${y}px)`,
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: color,
                opacity: particleOpacity,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          );
        });
      })}

      {/* Sparkles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const seed = i * 73.7;
        const x = seed % 100;
        const y = (seed * 1.3) % 100;
        const delay = (i * 3) % 40;
        const sparkleOpacity = interpolate(
          (frame + delay) % 60,
          [0, 30, 60],
          [0, 0.8, 0]
        );
        const size = 2 + (i % 3);

        return (
          <div
            key={`sparkle-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: "#fff",
              borderRadius: "50%",
              opacity: sparkleOpacity,
              boxShadow: `0 0 ${size * 3}px #fff`,
            }}
          />
        );
      })}

      {/* Rising particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const seed = i * 127.3;
        const x = seed % 100;
        const startY = 120;
        const yProgress = interpolate(
          (frame + i * 10) % 90,
          [0, 90],
          [0, 150]
        );
        const particleOpacity = interpolate(yProgress, [0, 50, 150], [0, 0.6, 0]);
        const size = 3 + (i % 3);
        const colors = ["#3b82f6", "#22c55e", "#a855f7"];

        return (
          <div
            key={`rising-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${startY - yProgress}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: colors[i % 3],
              opacity: particleOpacity,
              boxShadow: `0 0 ${size * 2}px ${colors[i % 3]}`,
            }}
          />
        );
      })}

      {/* Central glow */}
      {(() => {
        const glowPulse = interpolate(
          Math.sin(frame * 0.1),
          [-1, 1],
          [0.3, 0.5]
        );
        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(59, 130, 246, ${glowPulse}) 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              filter: "blur(80px)",
            }}
          />
        );
      })()}

      {/* Pulsing ring */}
      {[0, 1, 2].map((i) => {
        const ringDelay = i * 20;
        const ringProgress = interpolate(
          (frame + ringDelay) % 60,
          [0, 60],
          [0, 1]
        );
        const ringOpacity = interpolate(ringProgress, [0, 0.5, 1], [0.4, 0.2, 0]);
        const ringSize = 200 + ringProgress * 400;

        return (
          <div
            key={`ring-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${ringSize}px`,
              height: `${ringSize}px`,
              borderRadius: "50%",
              border: `2px solid rgba(59, 130, 246, ${ringOpacity})`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Main content container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {/* Main CTA title */}
        {(() => {
          const titleSpring = spring({
            frame: Math.max(0, frame - 5),
            fps,
            config: { damping: 10, stiffness: 100 },
          });

          return (
            <h1
              style={{
                fontSize: "80px",
                fontWeight: 700,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "#fff",
                marginBottom: "24px",
                transform: `scale(${titleSpring})`,
                textShadow: "0 0 60px rgba(59, 130, 246, 0.6)",
              }}
            >
              Visit Our Documentation
            </h1>
          );
        })()}

        {/* Website URL box */}
        {(() => {
          const urlDelay = 20;
          const urlSpring = spring({
            frame: Math.max(0, frame - urlDelay),
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const urlOpacity = interpolate(frame - urlDelay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Typing animation for URL
          const url = "moxa-working-group.vercel.app";
          const typedLength = Math.min(
            url.length,
            Math.floor((frame - urlDelay - 10) * 0.8)
          );
          const typedUrl = url.slice(0, Math.max(0, typedLength));
          const showCursor = frame % 30 < 15 && typedLength < url.length;

          return (
            <div
              style={{
                display: "inline-block",
                padding: "20px 48px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                marginBottom: "32px",
                opacity: urlOpacity,
                transform: `scale(${urlSpring})`,
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.2)",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: 600,
                  fontFamily: "SF Mono, Monaco, Consolas, monospace",
                  color: "#3b82f6",
                  letterSpacing: "1px",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                  <GlobeIcon color="#3b82f6" />
                  {typedUrl}
                </span>
                {showCursor && (
                  <span style={{ opacity: 0.8 }}>|</span>
                )}
              </span>
            </div>
          );
        })()}

        {/* Subtitle */}
        {(() => {
          const subtitleDelay = 40;
          const subtitleOpacity = interpolate(
            frame - subtitleDelay,
            [0, 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <p
              style={{
                fontSize: "32px",
                fontWeight: 400,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                opacity: subtitleOpacity,
                marginBottom: "40px",
              }}
            >
              Your unified frontend documentation hub
            </p>
          );
        })()}

        {/* Feature badges row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {[
            { icon: <BookIconSmall color="#fff" />, text: "Monorepo", color: "#3b82f6" },
            { icon: <SyncIconSmall color="#fff" />, text: "Code Gen", color: "#22c55e" },
            { icon: <RocketIconSmall color="#fff" />, text: "Migration", color: "#a855f7" },
          ].map((badge, i) => {
            const badgeDelay = 50 + i * 8;
            const badgeSpring = spring({
              frame: Math.max(0, frame - badgeDelay),
              fps,
              config: { damping: 10, stiffness: 150 },
            });
            const badgeOpacity = interpolate(
              frame - badgeDelay,
              [0, 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={badge.text}
                style={{
                  padding: "12px 24px",
                  borderRadius: "25px",
                  backgroundColor: `${badge.color}20`,
                  border: `1px solid ${badge.color}66`,
                  opacity: badgeOpacity,
                  transform: `scale(${badgeSpring})`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {badge.icon}
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: "#fff",
                  }}
                >
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Moxa branding */}
      {(() => {
        const brandOpacity = interpolate(frame - 60, [0, 20], [0, 0.6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: brandOpacity,
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: 500,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Moxa Frontend Team
            </span>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
