import { AbsoluteFill, Sequence } from "remotion";
import { Opening } from "./scenes/Opening";
import { GuidelineDemo } from "./scenes/GuidelineDemo";
import { Ending } from "./scenes/Ending";
import { GUIDELINES } from "./data/guidelinesContent";

/**
 * Working Group Guidelines - 30 second promotional video
 *
 * Timeline:
 * - 0-3s (0-90): Opening - Brand animation
 * - 3-11s (90-330): Monorepo Guideline demo (8 seconds)
 * - 11-19s (330-570): Code Gen Workflow demo (8 seconds)
 * - 19-27s (570-810): One-UI Migration demo (8 seconds)
 * - 27-30s (810-900): Ending
 */
export const WorkingGroupIntro: React.FC = () => {
  // Each guideline gets 8 seconds (240 frames) for detailed content
  const GUIDELINE_DURATION = 240;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      {/* Opening - Brand animation (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Opening />
      </Sequence>

      {/* Guideline demos (3-27s) - 8 seconds each */}
      {GUIDELINES.map((guideline, index) => (
        <Sequence
          key={guideline.name}
          from={90 + index * GUIDELINE_DURATION}
          durationInFrames={GUIDELINE_DURATION}
        >
          <GuidelineDemo
            name={guideline.name}
            description={guideline.description}
            iconType={guideline.iconType}
            accentColor={guideline.accentColor}
            tags={guideline.tags}
            features={guideline.features}
          />
        </Sequence>
      ))}

      {/* Ending (27-30s) */}
      <Sequence from={810} durationInFrames={90}>
        <Ending />
      </Sequence>
    </AbsoluteFill>
  );
};
