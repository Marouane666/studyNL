// Saves the language the visitor picked in the header onto their account.
//
// The picker itself keeps working without this (it falls back to localStorage
// for signed-out visitors), so this exists for the two things localStorage
// can't do: carry the choice to the member's other devices, and tell the server
// which language to write an email in.

import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/session";
import { isLangCode } from "@/lib/languages";
import { jsonError } from "@/lib/http";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  // Not an error worth surfacing: signed-out visitors are expected here, their
  // choice simply stays in the browser until they have an account to hold it.
  if (!user) return Response.json({ saved: false });

  const body = await request.json().catch(() => null);
  const language = body?.language;

  if (!isLangCode(language)) return jsonError("Unsupported language.", 400);

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ language })
    .eq("id", user.id);

  if (error) {
    console.error("PATCH /api/auth/language failed:", error);
    return jsonError("Couldn't save your language.", 500);
  }

  return Response.json({ saved: true, language });
}
