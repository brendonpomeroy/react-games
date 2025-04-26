import { useContext } from "react";
import { ScoresContext } from "./scores-context";

export const useScores = () => {
  const context = useContext(ScoresContext);
  if (!context)
    throw new Error("useScores must be used within a ScoresProvider");
  return context;
};
