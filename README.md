# ClaudeKit Intro Video

A promotional video for ClaudeKit built with [Remotion](https://www.remotion.dev/), showcasing its 5 core plugins.

## Video Specifications

- **Resolution:** 1920 x 1080 (Full HD)
- **Frame Rate:** 30 fps
- **Duration:** 30 seconds (900 frames)

## Video Timeline

| Time | Scene | Description |
|------|-------|-------------|
| 0-3s | Opening | ClaudeKit branding animation & logo |
| 3-8s | git | Commit validation demo |
| 8-13s | rubric | Automated code review |
| 13-18s | superpowers | TDD workflow |
| 18-23s | worktree-manager | Parallel development workflow |
| 23-27s | chrome-devtools | Browser automation testing |
| 27-30s | Ending | Install command & GitHub link |

## Tech Stack

- **Remotion** - React-based programmatic video creation framework
- **React 18** - UI components
- **TypeScript** - Type safety
- **Bun** - Package manager

## Project Structure

```
src/
├── index.ts              # Entry point
├── Root.tsx              # Composition definition
├── ClaudekitIntro.tsx    # Main video component
├── scenes/
│   ├── Opening.tsx       # Opening animation
│   ├── PluginDemo.tsx    # Plugin showcase template
│   └── Ending.tsx        # Ending animation
├── components/
│   ├── Terminal.tsx      # Terminal emulator
│   ├── TypeWriter.tsx    # Typewriter effect
│   ├── FadeIn.tsx        # Fade-in animation
│   └── Highlight.tsx     # Text highlight
└── data/
    └── terminalContent.ts # Terminal content data
```

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development Preview

Launch Remotion Studio for live preview and editing:

```bash
bun run dev
```

### Render Video

Render MP4 video to the `out/` directory:

```bash
bun run build
```

## Visual Features

- Dark theme with gradient backgrounds
- Particle system and light ray animations
- Smart terminal emulator with typing animation and color coding
- Plugin-specific color themes
- Spring physics animations

## License

MIT
