import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { grantPremium, revokePremium } from "@/lib/membership";
import { isPlan } from "@/lib/plan";
import { jsonError } from "@/lib/http";

/** Accepts null/"" (open-ended) or a parseable date, returned as an ISO string. */
function readExpiry(value: unknown): { ok: true; value: string | null } | { ok: false } {
  if (value === undefined || value === null || value === "") return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false };

  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return { ok: false };
  return { ok: true, value: new Date(parsed).toISOString() };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const plan = body?.plan;

  if (!isPlan(plan)) return jsonError("Invalid plan.", 400);

  const expiry = readExpiry(body?.expiresAt);
  if (!expiry.ok) return jsonError("Invalid membership end date.", 400);

  const { error } =
    plan === "premium" ? await grantPremium(id, expiry.value) : await revokePremium(id);

  if (error) {
    console.error("PATCH /api/admin/users/[id]/plan failed:", error);
    return jsonError("Couldn't update that user's membership.", 500);
  }

  return Response.json({
    ok: true,
    plan,
    planExpiresAt: plan === "premium" ? expiry.value : null,
  });
}
