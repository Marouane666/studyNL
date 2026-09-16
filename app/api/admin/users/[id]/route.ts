import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { cancelStripeSubscription } from "@/lib/membership";
import { jsonError } from "@/lib/http";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return jsonError("Admins only.", 403);

  const { id } = await params;
  if (id === user!.id) return jsonError("You can't delete your own account.", 400);

  // Billing first, and the delete is abandoned if it fails. Deleting the
  // account while the subscription lives on would leave someone charged every
  // month with no login, no portal and no way to stop it except a chargeback.
  const billing = await cancelStripeSubscription(id);
  if (!billing.stopped) {
    return jsonError(
      "Couldn't stop this member's billing, so the account was not deleted. Try again in a moment.",
      502,
    );
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) return jsonError("Couldn't delete that user.", 500);

  return Response.json({ ok: true });
}
