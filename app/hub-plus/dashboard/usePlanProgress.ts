"use client";

import { useEffect, useState } from "react";
import { type Stage, type TaskId, TASKS_BY_STAGE } from "../../start/tasks";

export type PlanProgress = {
  /** null until the member has answered the questions on /start. */
  stage: Stage | null;
  tasks: TaskId[];
  done: Record<string, boolean>;
  doneCount: number;
  nextTask: TaskId | null;
};

export const EMPTY_PROGRESS: PlanProgress = {
  stage: null,
  tasks: [],
  done: {},
  doneCount: 0,
  nextTask: null,
};

/**
 * Reads the member's saved move plan. Returns null while loading so cards can
 * hold their space instead of flashing an empty state they'll immediately replace.
 */
export function usePlanProgress(): PlanProgress | null {
  const [progress, setProgress] = useState<PlanProgress | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/plan");
        const data = await res.json().catch(() => null);
        if (cancelled) return;

        const stage = data?.plan?.answers?.stage as Stage | undefined;
        if (!stage || !TASKS_BY_STAGE[stage]) {
          setProgress(EMPTY_PROGRESS);
          return;
        }

        const done: Record<string, boolean> = data?.plan?.done ?? {};
        const tasks = TASKS_BY_STAGE[stage];
        setProgress({
          stage,
          tasks,
          done,
          doneCount: tasks.filter((id) => done[id]).length,
          nextTask: tasks.find((id) => !done[id]) ?? null,
        });
      } catch {
        // The rest of the dashboard works without the plan, so a failed load
        // falls back to the "build your plan" prompt rather than an error.
        if (!cancelled) setProgress(EMPTY_PROGRESS);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return progress;
}
