// Sends a password-reset email.
//
// Supabase Auth sends the mail itself (template and SMTP are configured in the
// Supabase dashboard), with a link that returns the member to /reset-password
// carrying a short-lived recovery session in the URL fragment.
//
// The response is the same whether or not an account exists for the address,
// so this form can't be used to find out who has a StudyNL account.

import { supabaseAdmin } from "@/lib/supabase/admin";
import { isValidEmail, jsonError } from "@/lib/http";
import { siteUrl } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!isValidEmail(email)) return jsonError("Please enter a valid email address.", 400);

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/reset-password`,
  });

  // Logged, not returned: an error here can depend on whether the account
  // exists (per-user rate limits), and telling the visitor would leak that.
  // A project-wide "over_email_send_rate_limit" means the Supabase default
  // mailer has run out, and custom SMTP needs setting up in the dashboard.
  if (error) console.error("password reset email failed:", error);

  return Response.json({ ok: true });
}
