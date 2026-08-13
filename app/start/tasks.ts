// Shared move-plan task catalogue, the source of truth for both the plan
// builder (`app/start/page.tsx`) and the Hub Plus dashboard
// (`app/hub-plus/dashboard/page.tsx`), which reports progress against it.
//
// The ids below are the same ones `app/api/plan` accepts and stores in
// `move_plans.done`, so they must stay in sync with TASK_IDS there.

export type Stage = "exploring" | "applying" | "accepted" | "here";
export type TaskId = "study-route" | "visa" | "funding" | "housing" | "cities" | "arrival";

export const TASK_HREFS: Record<TaskId, string> = {
  "study-route": "/guides/study-route",
  visa: "/guides/visa-residency",
  funding: "/guides/scholarships",
  housing: "/guides/accommodation",
  cities: "/cities",
  arrival: "/guides/arrival-checklist",
};

export const TASKS_BY_STAGE: Record<Stage, TaskId[]> = {
  exploring: ["study-route", "cities", "funding"],
  applying: ["study-route", "visa", "funding"],
  accepted: ["housing", "visa", "arrival"],
  here: ["arrival", "housing", "cities"],
};

/** Dictionary key for a task's title, e.g. `startPlan.task.housing.title`. */
export function taskTitleKey(id: TaskId): string {
  return `startPlan.task.${id}.title`;
}

/** Dictionary key for a task's one-line description. */
export function taskDescKey(id: TaskId): string {
  return `startPlan.task.${id}.desc`;
}
