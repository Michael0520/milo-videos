import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

/**
 * Opening scene - Brand animation
 * Duration: 3 seconds (90 frames @ 30fps)
 *
 * Features:
 * - "Working Group Guidelines" text animation (letter-by-letter)
 * - "Moxa Frontend Standards" subtitle
 * - Particle effects + glow background
 * - Feature badges animation
 */
export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Title text
  const title = "Working Group Guidelines";
  const subtitle = "Moxa Frontend Standards";

  // Feature badges
  const badges = ["Monorepo", "Code Gen", "Migration", "One-UI"];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a1a",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% 50%,
            rgba(59, 130, 246, ${0.15 * gradientProgress}) 0%,
            rgba(139, 92, 246, ${0.1 * gradientProgress}) 30%,
            transparent 70%)`,
        }}
      />

      {/* Light rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rayOpacity = interpolate(frame, [10, 40], [0, 0.1], {
          extrapolateRight: "clamp",
        });
        const rotation = (i * 45) + frame * 0.3;
        return (
          <div
            key={`ray-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "200%",
              height: "4px",
              background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, ${rayOpacity}), transparent)`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          />
        );
      })}

      {/* Pulse waves */}
      {[0, 1, 2].map((i) => {
        const waveDelay = i * 15;
        const waveProgress = interpolate(
          frame - waveDelay,
          [0, 60],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={`wave-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${200 + waveProgress * 600}px`,
              height: `${200 + waveProgress * 600}px`,
              borderRadius: "50%",
              border: `2px solid rgba(59, 130, 246, ${0.3 * (1 - waveProgress)})`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Main glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle,
            rgba(59, 130, 246, ${0.2 * gradientProgress}) 0%,
            transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary glows */}
      {[
        { x: -200, y: -100, color: "139, 92, 246", delay: 20 },
        { x: 200, y: 100, color: "34, 197, 94", delay: 30 },
      ].map((glow, i) => {
        const glowOpacity = interpolate(frame - glow.delay, [0, 30], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const floatOffset = Math.sin((frame + glow.delay) * 0.05) * 20;
        return (
          <div
            key={`glow-${i}`}
            style={{
              position: "absolute",
              top: `calc(50% + ${glow.y + floatOffset}px)`,
              left: `calc(50% + ${glow.x}px)`,
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${glow.color}, ${glowOpacity}) 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
            }}
          />
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const seed = i * 137.5;
        const angle = (seed % 360) * (Math.PI / 180);
        const radius = 150 + (seed % 300);
        const speed = 0.02 + (i % 10) * 0.003;
        const particleAngle = angle + frame * speed;
        const x = Math.cos(particleAngle) * radius;
        const y = Math.sin(particleAngle) * radius;
        const size = 2 + (i % 4);
        const opacity = interpolate(frame, [0, 20], [0, 0.3 + (i % 5) * 0.1], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: `rgba(59, 130, 246, ${opacity})`,
              boxShadow: `0 0 ${size * 2}px rgba(59, 130, 246, ${opacity * 0.5})`,
            }}
          />
        );
      })}

      {/* Sparkles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const seed = i * 73.7;
        const x = (seed % 1920) - 960;
        const y = ((seed * 1.3) % 1080) - 540;
        const delay = (i * 5) % 30;
        const sparkleOpacity = interpolate(
          (frame + delay) % 60,
          [0, 30, 60],
          [0, 0.8, 0],
          { extrapolateRight: "clamp" }
        );
        const size = 3 + (i % 3);

        return (
          <div
            key={`sparkle-${i}`}
            style={{
              position: "absolute",
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
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

      {/* Main title - letter by letter animation */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title.split("").map((letter, i) => {
          const letterDelay = i * 1.5;
          const letterSpring = spring({
            frame: Math.max(0, frame - letterDelay - 5),
            fps,
            config: { damping: 12, stiffness: 150, mass: 0.8 },
          });
          const letterOpacity = interpolate(
            frame - letterDelay - 5,
            [0, 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <span
              key={`letter-${i}`}
              style={{
                display: "inline-block",
                fontSize: "72px",
                fontWeight: 700,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "#fff",
                textShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
                opacity: letterOpacity,
                transform: `scale(${letterSpring}) translateY(${(1 - letterSpring) * 20}px)`,
                marginRight: letter === " " ? "20px" : "0",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {(() => {
          const subtitleSpring = spring({
            frame: Math.max(0, frame - 45),
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const subtitleOpacity = interpolate(frame - 45, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              style={{
                fontSize: "32px",
                fontWeight: 500,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "rgba(255, 255, 255, 0.7)",
                opacity: subtitleOpacity,
                transform: `scale(${subtitleSpring})`,
                display: "block",
                textAlign: "center",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </span>
          );
        })()}
      </div>

      {/* Feature badges */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "24px",
        }}
      >
        {badges.map((badge, i) => {
          const badgeDelay = 55 + i * 8;
          const badgeSpring = spring({
            frame: Math.max(0, frame - badgeDelay),
            fps,
            config: { damping: 10, stiffness: 150 },
          });
          const badgeOpacity = interpolate(frame - badgeDelay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const colors = [
            { bg: "59, 130, 246", border: "#3b82f6" },
            { bg: "34, 197, 94", border: "#22c55e" },
            { bg: "168, 85, 247", border: "#a855f7" },
            { bg: "234, 179, 8", border: "#eab308" },
          ];
          const color = colors[i];

          return (
            <div
              key={badge}
              style={{
                padding: "12px 24px",
                borderRadius: "30px",
                backgroundColor: `rgba(${color.bg}, 0.15)`,
                border: `1px solid ${color.border}`,
                opacity: badgeOpacity,
                transform: `scale(${badgeSpring}) translateY(${(1 - badgeSpring) * 20}px)`,
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                  color: color.border,
                }}
              >
                {badge}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
