import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

interface GuidelineDemoProps {
  name: string;
  description: string;
  iconType: "book" | "sync" | "rocket";
  accentColor: string;
  tags: string[];
  features: string[];
}

// SVG Icons - Clean, minimal line icons
const BookIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
  </svg>
);

const SyncIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const RocketIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const getIcon = (iconType: "book" | "sync" | "rocket", color: string, size: number) => {
  switch (iconType) {
    case "book":
      return <BookIcon color={color} size={size} />;
    case "sync":
      return <SyncIcon color={color} size={size} />;
    case "rocket":
      return <RocketIcon color={color} size={size} />;
  }
};

/**
 * GuidelineDemo scene - Document-style layout
 * Designed to reflect documentation aesthetics: clean hierarchy, readable structure
 * Duration: 8 seconds (240 frames @ 30fps)
 */
export const GuidelineDemo: React.FC<GuidelineDemoProps> = ({
  name,
  description,
  iconType,
  accentColor,
  tags,
  features,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f1a",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            linear-gradient(135deg, ${hexToRgba(accentColor, 0.03)} 0%, transparent 50%),
            linear-gradient(225deg, ${hexToRgba(accentColor, 0.02)} 0%, transparent 50%)
          `,
        }}
      />

      {/* Document-style container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header section */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "32px",
            marginBottom: "40px",
            paddingBottom: "32px",
            borderBottom: `2px solid ${hexToRgba(accentColor, 0.3)}`,
          }}
        >
          {/* Icon */}
          {(() => {
            const iconScale = spring({
              frame: Math.max(0, frame - 5),
              fps,
              config: { damping: 12, stiffness: 100 },
            });

            return (
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "16px",
                  backgroundColor: hexToRgba(accentColor, 0.15),
                  border: `2px solid ${hexToRgba(accentColor, 0.3)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${iconScale})`,
                  boxShadow: `0 4px 24px ${hexToRgba(accentColor, 0.25)}`,
                }}
              >
                {getIcon(iconType, accentColor, 36)}
              </div>
            );
          })()}

          {/* Title & Description */}
          <div style={{ flex: 1 }}>
            {(() => {
              const titleOpacity = interpolate(frame - 10, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const titleY = interpolate(frame - 10, [0, 15], [20, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <h1
                  style={{
                    fontSize: "72px",
                    fontWeight: 700,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: "#fff",
                    marginBottom: "12px",
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                  }}
                >
                  {name}
                </h1>
              );
            })()}

            {(() => {
              const descOpacity = interpolate(frame - 18, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 400,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "24px",
                    opacity: descOpacity,
                  }}
                >
                  {description}
                </p>
              );
            })()}

            {/* Tags */}
            <div style={{ display: "flex", gap: "10px" }}>
              {tags.map((tag, i) => {
                const tagDelay = 25 + i * 5;
                const tagOpacity = interpolate(frame - tagDelay, [0, 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });

                return (
                  <div
                    key={tag}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "8px",
                      backgroundColor: hexToRgba(accentColor, 0.15),
                      border: `1px solid ${hexToRgba(accentColor, 0.3)}`,
                      opacity: tagOpacity,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "28px",
                        fontWeight: 500,
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                        color: accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content section - Table of Contents style */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {/* Section label */}
          {(() => {
            const labelOpacity = interpolate(frame - 35, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                style={{
                  marginBottom: "20px",
                  opacity: labelOpacity,
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: accentColor,
                    textTransform: "uppercase",
                    letterSpacing: "4px",
                  }}
                >
                  Key Topics
                </span>
              </div>
            );
          })()}

          {/* Feature list - Clean document list style */}
          {features.map((feature, i) => {
            const itemDelay = 45 + i * 12;
            const itemOpacity = interpolate(frame - itemDelay, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const itemX = interpolate(frame - itemDelay, [0, 15], [-30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Highlight animation - each item gets highlighted briefly
            const highlightStart = 100 + i * 25;
            const highlightProgress = interpolate(
              frame,
              [highlightStart, highlightStart + 15, highlightStart + 40],
              [0, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={`feature-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "18px 24px",
                  marginLeft: "20px",
                  borderLeft: `3px solid ${hexToRgba(accentColor, 0.2 + highlightProgress * 0.6)}`,
                  backgroundColor: hexToRgba(accentColor, highlightProgress * 0.08),
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  transition: "background-color 0.3s ease",
                }}
              >
                {/* Bullet/number */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: hexToRgba(accentColor, 0.15 + highlightProgress * 0.25),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "24px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      color: accentColor,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Feature text */}
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 500,
                    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
                    color: `rgba(255, 255, 255, ${0.8 + highlightProgress * 0.2})`,
                  }}
                >
                  {feature}
                </span>

                {/* Arrow indicator on highlight */}
                <div
                  style={{
                    marginLeft: "auto",
                    opacity: highlightProgress,
                    transform: `translateX(${(1 - highlightProgress) * 10}px)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "28px",
                      color: accentColor,
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accent color indicator bar at top */}
      {(() => {
        const barWidth = spring({
          frame: Math.max(0, frame - 5),
          fps,
          config: { damping: 20, stiffness: 80 },
        });

        return (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: `${barWidth * 100}%`,
              height: "4px",
              backgroundColor: accentColor,
            }}
          />
        );
      })()}

      {/* Progress indicator */}
      {(() => {
        const progress = interpolate(frame, [0, 240], [0, 100], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: `${progress}%`,
              height: "3px",
              backgroundColor: accentColor,
              opacity: 0.6,
            }}
          />
        );
      })()}
    </AbsoluteFill>
  );
};
