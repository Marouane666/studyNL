import "server-only";

export const FORUM_MEDIA_BUCKET = "forum-media";

// Maps an allowlisted MIME type to its stored extension. SVG is deliberately
// excluded — it can carry executable <script> content, and the public
// storage URL would serve it as-is if opened directly outside an <img> tag.
export const FORUM_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/** True only for a public URL our own upload route just produced for this bucket. */
export function isForumMediaUrl(url: string): boolean {
  const base = process.env.SUPABASE_URL;
  if (!base) return false;
  return url.startsWith(`${base}/storage/v1/object/public/${FORUM_MEDIA_BUCKET}/`);
}
