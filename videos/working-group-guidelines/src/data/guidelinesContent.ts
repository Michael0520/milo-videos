export interface Guideline {
  name: string;
  description: string;
  iconType: "book" | "sync" | "rocket";
  accentColor: string;
  tags: string[];
  features: string[];
}

export const GUIDELINES: Guideline[] = [
  {
    name: "Monorepo Guideline",
    description: "One-UI Angular Monorepo development standards and best practices",
    iconType: "book",
    accentColor: "#3b82f6",
    tags: ["angular", "nx", "one-ui"],
    features: [
      "Nx Workspace project structure standards",
      "Shared component library conventions",
      "Code quality and linting rules",
      "Unit testing and E2E testing strategies",
      "Git branching and PR workflow guidelines",
    ],
  },
  {
    name: "Code Gen Workflow",
    description: "OpenAPI to TypeScript automated code generation pipeline",
    iconType: "sync",
    accentColor: "#22c55e",
    tags: ["openapi", "swagger", "typescript"],
    features: [
      "OpenAPI specification standards",
      "Auto-generated API client services",
      "Type-safe request/response interfaces",
      "Mock server integration testing",
      "CI/CD pipeline automated updates",
    ],
  },
  {
    name: "One-UI Migration",
    description: "Angular 16 to 20 upgrade guide with DDD architecture patterns",
    iconType: "rocket",
    accentColor: "#a855f7",
    tags: ["angular-20", "ddd", "signalstore"],
    features: [
      "Domain-Driven Design layered architecture",
      "NgRx SignalStore state management",
      "Standalone components migration",
      "Signal-based reactive development",
      "Performance optimization and bundle size control",
    ],
  },
];
