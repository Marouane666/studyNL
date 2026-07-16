import { supabaseAdmin } from "@/lib/supabase/admin";
import { isValidEmail, jsonError } from "@/lib/http";

const MAX_MESSAGE_LENGTH = 4000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name) return jsonError("Please enter your name.", 400);
  if (!isValidEmail(email)) return jsonError("Please enter a valid email address.", 400);
  if (!message) return jsonError("Please enter a message.", 400);
  if (message.length > MAX_MESSAGE_LENGTH) return jsonError("That message is too long.", 400);

  const { error } = await supabaseAdmin.from("contact_messages").insert({ name, email, message });

  if (error) {
    console.error("POST /api/contact insert failed:", error);
    return jsonError("Couldn't send that. Please try again.", 500);
  }

  return Response.json({ ok: true });
}
