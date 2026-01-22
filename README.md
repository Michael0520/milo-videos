# ClaudeKit Intro Video

使用 [Remotion](https://www.remotion.dev/) 製作的 ClaudeKit 宣傳影片，展示 ClaudeKit 的 5 個核心插件。

## 影片規格

- **解析度:** 1920 x 1080 (Full HD)
- **幀率:** 30 fps
- **時長:** 30 秒 (900 幀)

## 影片內容

| 時間 | 場景 | 說明 |
|------|------|------|
| 0-3s | Opening | ClaudeKit 品牌動畫與 Logo |
| 3-8s | git | 展示 commit 驗證功能 |
| 8-13s | rubric | 自動化程式碼審查 |
| 13-18s | superpowers | TDD 工作流程 |
| 18-23s | worktree-manager | 平行開發工作流 |
| 23-27s | chrome-devtools | 瀏覽器自動化測試 |
| 27-30s | Ending | 安裝指令與 GitHub 連結 |

## 技術棧

- **Remotion** - React-based 程式化影片製作框架
- **React 18** - UI 組件
- **TypeScript** - 型別安全
- **Bun** - 套件管理器

## 專案結構

```
src/
├── index.ts              # 入口點
├── Root.tsx              # Composition 定義
├── ClaudekitIntro.tsx    # 主影片組件
├── scenes/
│   ├── Opening.tsx       # 開場動畫
│   ├── PluginDemo.tsx    # 插件展示模板
│   └── Ending.tsx        # 結尾動畫
├── components/
│   ├── Terminal.tsx      # 終端機模擬器
│   ├── TypeWriter.tsx    # 打字機效果
│   ├── FadeIn.tsx        # 淡入動畫
│   └── Highlight.tsx     # 文字高亮
└── data/
    └── terminalContent.ts # 終端機內容資料
```

## 開始使用

### 安裝依賴

```bash
bun install
```

### 開發預覽

啟動 Remotion Studio 進行即時預覽與編輯：

```bash
bun run dev
```

### 輸出影片

渲染 MP4 影片到 `out/` 目錄：

```bash
bun run build
```

## 視覺特色

- 深色主題搭配漸層背景
- 粒子系統與光線動畫
- 智能終端機模擬器（支援打字動畫、顏色編碼）
- 各插件專屬配色主題
- Spring 物理動畫效果

## License

MIT
