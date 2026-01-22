import { Composition } from "remotion";
import { WorkingGroupIntro } from "./WorkingGroupIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WorkingGroupIntro"
        component={WorkingGroupIntro}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
