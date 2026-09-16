import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { cancelStripeSubscription } from "@/lib/membership";
import { jsonError } from "@/lib/http";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = typeof body?.status === "string" ? body.status : "";

  if (status !== "active" && status !== "suspended") return jsonError("Invalid status.", 400);
  if (id === user!.id) return jsonError("You can't suspend your own account.", 400);

  const { error } = await supabaseAdmin.from("profiles").update({ status }).eq("id", id);
  if (error) return jsonError("Couldn't update that user's status.", 500);

  // Suspension happens first and is never blocked: locking a bad actor out is
  // the urgent half, and it must not wait on a payment provider being reachable.
  //
  // Billing is then stopped, because charging someone monthly for a product
  // they've been locked out of is indefensible — and it is the line that reads
  // worst of all in a chargeback dispute. A failure here is reported rather
  // than hidden, so an admin knows to retry, with the suspension already done.
  if (status === "suspended") {
    const billing = await cancelStripeSubscription(id);
    if (!billing.stopped) {
      return Response.json({
        ok: true,
        status,
        billingStopped: false,
        warning:
          "This member is suspended, but their Stripe subscription could not be cancelled — they may still be charged. Please retry or cancel it in Stripe.",
      });
    }
  }

  return Response.json({ ok: true, status, billingStopped: true });
}
