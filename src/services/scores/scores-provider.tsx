import { useState } from "react";
import { SCORES_KEY } from "../../constants";
import { Scores, ScoresContext } from "./scores-context";
import { isObject } from "../../utils";

export const ScoresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scores, setScores] = useState<Scores>(() => {
    const raw = localStorage.getItem(SCORES_KEY);
    return raw ? JSON.parse(raw) : {};
  });

  const get = <T,>(key: string, transformer?: (data: unknown) => T): T => {
    const data = scores[key] ?? {};
    return transformer ? transformer(data) : (data as T);
  };

  const update = (key: string, data: Partial<unknown>) => {
    setScores((prev) => {
      const existing = prev[key];
      const updated = {
        ...(isObject(existing) ? existing : {}),
        ...data,
      };
      const newScores = { ...prev, [key]: updated };
      localStorage.setItem(SCORES_KEY, JSON.stringify(newScores));
      return newScores;
    });
  };

  return (
    <ScoresContext.Provider value={{ get, update }}>
      {children}
    </ScoresContext.Provider>
  );
};
