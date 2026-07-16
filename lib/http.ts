export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}
