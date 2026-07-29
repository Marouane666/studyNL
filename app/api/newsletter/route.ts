import { appendSheetRow, sheetTimestamp } from "@/lib/googleSheets";
import { isValidEmail, jsonError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!isValidEmail(email)) return jsonError("Please enter a valid email address.", 400);

  try {
    // Column order matches the sheet header: email | created_at.
    await appendSheetRow([email, sheetTimestamp()]);
  } catch (err) {
    console.error("POST /api/newsletter sheet append failed:", err);
    return jsonError("Couldn't subscribe right now. Please try again.", 500);
  }

  return Response.json({ ok: true });
}
