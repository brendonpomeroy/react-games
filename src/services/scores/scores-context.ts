// src/context/ScoresContext.tsx
import { createContext } from "react";

export type Scores = Record<string, unknown>;

interface ScoresContextType {
  get: <T>(key: string, transformer?: (data: unknown) => T) => T;
  update: (key: string, data: Partial<unknown>) => void;
}

export const ScoresContext = createContext<ScoresContextType | undefined>(
  undefined,
);
