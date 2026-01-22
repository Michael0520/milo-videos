import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: "runtime" | "framework" | "tooling";
}

const TECH_STACK: TechItem[] = [
  // Runtime & Framework
  { name: "Bun", icon: "🥟", color: "#fbf0df", category: "runtime" },
  { name: "React 19", icon: "⚛️", color: "#61dafb", category: "framework" },
  { name: "TanStack Start", icon: "🚀", color: "#ff4154", category: "framework" },
  // Documentation
  { name: "Fumadocs", icon: "📚", color: "#8b5cf6", category: "framework" },
  { name: "MDX", icon: "📝", color: "#f9ac00", category: "framework" },
  // Tooling
  { name: "TypeScript", icon: "📘", color: "#3178c6", category: "tooling" },
  { name: "Tailwind CSS", icon: "🎨", color: "#06b6d4", category: "tooling" },
  { name: "Biome", icon: "🌿", color: "#60a5fa", category: "tooling" },
];

/**
 * TechStack scene - Technology showcase
 * Duration: 4 seconds (120 frames @ 30fps)
 */
export const TechStack: React.FC = () => {
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
      {/* Background with tech-inspired pattern */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(97, 218, 251, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated circuit lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const lineProgress = interpolate(
          (frame + i * 15) % 120,
          [0, 60, 120],
          [0, 1, 0]
        );
        const isHorizontal = i < 6;
        const position = 10 + (i % 6) * 16;

        return (
          <div
            key={`circuit-${i}`}
            style={{
              position: "absolute",
              ...(isHorizontal
                ? {
                    top: `${position}%`,
                    left: 0,
                    width: `${lineProgress * 100}%`,
                    height: "1px",
                  }
                : {
                    left: `${position}%`,
                    top: 0,
                    width: "1px",
                    height: `${lineProgress * 100}%`,
                  }),
              background: `linear-gradient(${isHorizontal ? "90deg" : "180deg"},
                transparent,
                rgba(97, 218, 251, 0.3),
                transparent)`,
            }}
          />
        );
      })}

      {/* Connection nodes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const nodeDelay = i * 10;
        const nodeOpacity = interpolate(frame - nodeDelay, [0, 20], [0, 0.4], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const pulse = interpolate(
          Math.sin((frame + i * 30) * 0.1),
          [-1, 1],
          [0.5, 1]
        );
        const x = 10 + (i % 4) * 26;
        const y = 20 + Math.floor(i / 4) * 60;

        return (
          <div
            key={`node-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#61dafb",
              opacity: nodeOpacity * pulse,
              boxShadow: "0 0 10px #61dafb",
            }}
          />
        );
      })}

      {/* Section title */}
      {(() => {
        const titleSpring = spring({
          frame: Math.max(0, frame - 5),
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: `translate(-50%, 0) scale(${titleSpring})`,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "56px",
                fontWeight: 700,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "#fff",
                marginBottom: "12px",
                textShadow: "0 0 40px rgba(97, 218, 251, 0.4)",
              }}
            >
              Modern Tech Stack
            </h2>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 400,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Cutting-edge tools for optimal performance
            </p>
          </div>
        );
      })()}

      {/* Tech items in orbital layout */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "400px",
        }}
      >
        {TECH_STACK.map((tech, i) => {
          const itemDelay = 15 + i * 8;
          const itemSpring = spring({
            frame: Math.max(0, frame - itemDelay),
            fps,
            config: { damping: 10, stiffness: 120 },
          });
          const itemOpacity = interpolate(frame - itemDelay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Arrange in two rows
          const row = Math.floor(i / 4);
          const col = i % 4;
          const xOffset = (col - 1.5) * 220;
          const yOffset = (row - 0.5) * 160;

          // Floating animation
          const float = Math.sin((frame + i * 25) * 0.06) * 8;

          // Glow pulse
          const glowIntensity = interpolate(
            Math.sin((frame + i * 15) * 0.08),
            [-1, 1],
            [0.2, 0.5]
          );

          const hexToRgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          };

          return (
            <div
              key={tech.name}
              style={{
                position: "absolute",
                left: `calc(50% + ${xOffset}px)`,
                top: `calc(50% + ${yOffset}px)`,
                transform: `translate(-50%, -50%) scale(${itemSpring}) translateY(${float}px)`,
                opacity: itemOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "22px",
                  backgroundColor: hexToRgba(tech.color, 0.15),
                  border: `2px solid ${hexToRgba(tech.color, 0.4)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 30px ${hexToRgba(tech.color, glowIntensity)}`,
                }}
              >
                <span style={{ fontSize: "44px" }}>{tech.icon}</span>
              </div>

              {/* Tech name */}
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                  color: "#fff",
                  textShadow: `0 0 20px ${hexToRgba(tech.color, 0.5)}`,
                }}
              >
                {tech.name}
              </span>
            </div>
          );
        })}

        {/* Connecting lines between items */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Horizontal connections */}
          {[0, 1, 2, 4, 5, 6].map((i) => {
            const lineOpacity = interpolate(frame - 40, [0, 30], [0, 0.15], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const row = Math.floor(i / 4);
            const col = i % 4;
            const x1 = 50 + (col - 1.5) * (220 / 9) * 100 / 100 + 5;
            const x2 = 50 + (col - 0.5) * (220 / 9) * 100 / 100 - 5;
            const y = 50 + (row - 0.5) * (160 / 4) * 100 / 100;

            return (
              <line
                key={`h-line-${i}`}
                x1={`${x1}%`}
                y1={`${y}%`}
                x2={`${x2}%`}
                y2={`${y}%`}
                stroke={`rgba(97, 218, 251, ${lineOpacity})`}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>
      </div>

      {/* Bottom badge */}
      {(() => {
        const badgeSpring = spring({
          frame: Math.max(0, frame - 70),
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <div
            style={{
              position: "absolute",
              bottom: "8%",
              left: "50%",
              transform: `translate(-50%, 0) scale(${badgeSpring})`,
              padding: "16px 32px",
              borderRadius: "30px",
              backgroundColor: "rgba(97, 218, 251, 0.1)",
              border: "1px solid rgba(97, 218, 251, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: 500,
                fontFamily: "SF Mono, Monaco, Consolas, monospace",
                color: "#61dafb",
              }}
            >
              🚀 Built for Speed & Developer Experience
            </span>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
