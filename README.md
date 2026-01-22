# Remotion Videos Monorepo

A monorepo for Remotion-based video projects with shared animation components.

## Structure

```
remotion-videos/
├── packages/
│   └── shared/                     # Shared animation components
│       └── src/
│           ├── Terminal.tsx        # Terminal emulator
│           ├── TypeWriter.tsx      # Typewriter effect
│           ├── FadeIn.tsx          # Fade-in animation
│           └── Highlight.tsx       # Text highlight
│
└── videos/
    └── claudekit-intro/            # ClaudeKit promotional video
        └── src/
            ├── Root.tsx
            ├── ClaudekitIntro.tsx
            ├── scenes/
            └── data/
```

## Tech Stack

- **Remotion** - React-based programmatic video creation framework
- **React 18** - UI components
- **TypeScript** - Type safety
- **Bun** - Package manager with workspaces

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development

Launch Remotion Studio for a specific video:

```bash
cd videos/claudekit-intro
bun run dev
```

### Render Video

```bash
cd videos/claudekit-intro
bun run build
```

## Shared Components

The `@milo-videos/shared` package provides reusable animation components:

- **Terminal** - Terminal emulator with typing animation
- **TypeWriter** - Typewriter text effect
- **FadeIn** - Fade-in with slide animation
- **Highlight** - Spring-animated text highlight

Import in your video projects:

```tsx
import { Terminal, TypeWriter, FadeIn, Highlight } from "@milo-videos/shared";
```

## Videos

### claudekit-intro

ClaudeKit promotional video showcasing its core plugins.

- **Resolution:** 1920 x 1080 (Full HD)
- **Frame Rate:** 30 fps
- **Duration:** 30 seconds

## License

MIT
