import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const FEATURES: Feature[] = [
  {
    icon: "📝",
    title: "MDX Documentation",
    description: "Interactive docs with live examples",
    color: "#3b82f6",
  },
  {
    icon: "🌙",
    title: "Dark/Light Mode",
    description: "Adaptive theme for comfort",
    color: "#8b5cf6",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description: "Works on any device",
    color: "#22c55e",
  },
  {
    icon: "🧭",
    title: "Smart Navigation",
    description: "Sidebar & search integration",
    color: "#f59e0b",
  },
];

/**
 * FeaturesShowcase scene - Website features highlight
 * Duration: 5 seconds (150 frames @ 30fps)
 */
export const FeaturesShowcase: React.FC = () => {
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
      {/* Background gradient mesh */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Animated grid lines */}
      {Array.from({ length: 20 }).map((_, i) => {
        const lineOpacity = interpolate(
          (frame + i * 10) % 150,
          [0, 75, 150],
          [0.02, 0.08, 0.02]
        );
        const isVertical = i < 10;
        const position = (i % 10) * 10 + 5;

        return (
          <div
            key={`line-${i}`}
            style={{
              position: "absolute",
              ...(isVertical
                ? {
                    left: `${position}%`,
                    top: 0,
                    width: "1px",
                    height: "100%",
                  }
                : {
                    top: `${position}%`,
                    left: 0,
                    width: "100%",
                    height: "1px",
                  }),
              backgroundColor: `rgba(255, 255, 255, ${lineOpacity})`,
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
              top: "12%",
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
                textShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
              }}
            >
              Powerful Features
            </h2>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 400,
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Built for modern documentation needs
            </p>
          </div>
        );
      })()}

      {/* Feature cards grid */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "32px",
          width: "80%",
          maxWidth: "1200px",
        }}
      >
        {FEATURES.map((feature, i) => {
          const cardDelay = 20 + i * 15;
          const cardSpring = spring({
            frame: Math.max(0, frame - cardDelay),
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const cardOpacity = interpolate(frame - cardDelay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Icon pulse animation
          const iconPulse = interpolate(
            Math.sin((frame + i * 20) * 0.08),
            [-1, 1],
            [0.9, 1.1]
          );

          const hexToRgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          };

          return (
            <div
              key={feature.title}
              style={{
                padding: "40px",
                borderRadius: "24px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${hexToRgba(feature.color, 0.3)}`,
                backdropFilter: "blur(10px)",
                opacity: cardOpacity,
                transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 30}px)`,
                display: "flex",
                alignItems: "flex-start",
                gap: "24px",
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  backgroundColor: hexToRgba(feature.color, 0.15),
                  border: `1px solid ${hexToRgba(feature.color, 0.3)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: `scale(${iconPulse})`,
                  boxShadow: `0 0 30px ${hexToRgba(feature.color, 0.2)}`,
                }}
              >
                <span style={{ fontSize: "40px" }}>{feature.icon}</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: 600,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: "rgba(255, 255, 255, 0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Accent dot */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: feature.color,
                  boxShadow: `0 0 15px ${feature.color}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Floating decoration particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const seed = i * 97.3;
        const x = (seed % 100);
        const y = ((seed * 1.7) % 100);
        const size = 3 + (i % 4);
        const speed = 0.03 + (i % 5) * 0.01;
        const floatY = Math.sin((frame + i * 20) * speed) * 20;
        const particleOpacity = interpolate(frame, [0, 30], [0, 0.3], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              top: `${y}%`,
              left: `${x}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: FEATURES[i % 4].color,
              opacity: particleOpacity,
              transform: `translateY(${floatY}px)`,
              boxShadow: `0 0 ${size * 2}px ${FEATURES[i % 4].color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
