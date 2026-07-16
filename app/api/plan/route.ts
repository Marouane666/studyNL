import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";

const STAGES = new Set(["exploring", "applying", "accepted", "here"]);
const STATUSES = new Set(["eu", "nonEu", "unsure"]);
const LEVELS = new Set(["bachelor", "master", "exchange", "other"]);
const CITY_CHOICES = new Set(["chosen", "shortlist", "open"]);
const TASK_IDS = new Set(["study-route", "visa", "funding", "housing", "cities", "arrival"]);

function sanitizeAnswers(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};
  const input = value as Record<string, unknown>;
  const answers: Record<string, string> = {};
  if (typeof input.stage === "string" && STAGES.has(input.stage)) answers.stage = input.stage;
  if (typeof input.status === "string" && STATUSES.has(input.status)) answers.status = input.status;
  if (typeof input.level === "string" && LEVELS.has(input.level)) answers.level = input.level;
  if (typeof input.city === "string" && CITY_CHOICES.has(input.city)) answers.city = input.city;
  return answers;
}

function sanitizeDone(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== "object") return {};
  const input = value as Record<string, unknown>;
  const done: Record<string, boolean> = {};
  for (const id of TASK_IDS) {
    if (typeof input[id] === "boolean") done[id] = input[id] as boolean;
  }
  return done;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Log in to load your plan.", 401);

  const { data, error } = await supabaseAdmin
    .from("move_plans")
    .select("answers, done")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return jsonError("Couldn't load your plan.", 500);

  return Response.json({ plan: data ?? null });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return jsonError("Log in to save your plan.", 401);

  const body = await request.json().catch(() => null);
  const answers = sanitizeAnswers(body?.answers);
  const done = sanitizeDone(body?.done);

  const { error } = await supabaseAdmin
    .from("move_plans")
    .upsert({ user_id: user.id, answers, done, updated_at: new Date().toISOString() });

  if (error) {
    console.error("PUT /api/plan upsert failed:", error);
    return jsonError("Couldn't save your plan.", 500);
  }

  return Response.json({ ok: true });
}
