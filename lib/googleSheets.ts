import "server-only";
import { createSign } from "node:crypto";

// Minimal Google Sheets v4 append client. Hand-rolled rather than pulling in
// `googleapis` (~15MB of transitive deps) because the whole surface we need is
// one OAuth token exchange and one POST.

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// Access tokens are valid for an hour; minting a fresh one per subscriber would
// add a round trip to every signup. Refreshed a minute early to avoid racing
// the expiry on a slow request.
let cachedToken: { value: string; expiresAt: number } | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Set it in .env.local.`);
  return value;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function normalizePrivateKey(raw: string): string {
  // Env files store the PEM on one line with literal backslash-n, which
  // node:crypto rejects — it needs actual line breaks. Surrounding quotes
  // survive some shells/hosts too, so strip those as well.
  return raw.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) return cachedToken.value;

  const clientEmail = requiredEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
  const privateKey = normalizePrivateKey(requiredEnv("GOOGLE_SHEETS_PRIVATE_KEY"));

  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = base64url(signer.sign(privateKey));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const data = (await res.json().catch(() => null)) as
    | { access_token?: string; expires_in?: number; error_description?: string }
    | null;

  if (!res.ok || !data?.access_token) {
    throw new Error(
      `Google token exchange failed (${res.status}): ${data?.error_description ?? "no access_token returned"}`,
    );
  }

  cachedToken = {
    value: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600),
  };
  return cachedToken.value;
}

/**
 * Appends one row to the configured spreadsheet's first tab (or
 * GOOGLE_SHEETS_TAB when set). Throws on any failure so callers decide whether
 * a signup counts as saved.
 */
export async function appendSheetRow(values: (string | number)[]): Promise<void> {
  const spreadsheetId = requiredEnv("GOOGLE_SHEETS_ID");
  const tab = process.env.GOOGLE_SHEETS_TAB;
  // Bare "A:B" targets the first tab, which is what an unconfigured sheet wants.
  const range = tab ? `${tab}!A:B` : "A:B";

  const token = await getAccessToken();
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}` +
    `/values/${encodeURIComponent(range)}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheets append failed (${res.status}): ${detail.slice(0, 500)}`);
  }
}

/**
 * "2026-07-29 14:05:31" in UTC. Google Sheets parses this into a real datetime
 * cell in every locale (unlike a full ISO string with T/Z, which lands as
 * text), so the column stays sortable and filterable.
 */
export function sheetTimestamp(date: Date = new Date()): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}
