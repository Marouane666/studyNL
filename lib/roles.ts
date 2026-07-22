// Pure role logic, safe to import from both server (route handlers, lib/auth/session.ts)
// and client ("use client" components) code, no server-only imports here.

export type Role = "member" | "moderator" | "admin";

export function isModeratorRole(role: Role | undefined | null): boolean {
  return role === "moderator" || role === "admin";
}

export function isAdminRole(role: Role | undefined | null): boolean {
  return role === "admin";
}
