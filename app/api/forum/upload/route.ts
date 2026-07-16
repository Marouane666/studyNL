import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth/session";
import { jsonError } from "@/lib/http";
import { FORUM_IMAGE_TYPES, FORUM_MEDIA_BUCKET } from "@/lib/forum/media";

const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return jsonError("Log in to upload images.", 401);

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) return jsonError("No image was provided.", 400);

  // Explicit allowlist (not just an "image/*" prefix check): SVG reports as
  // an image MIME type but can contain executable <script> content, which
  // isn't safe to serve back from a public storage URL.
  const ext = FORUM_IMAGE_TYPES[file.type];
  if (!ext) return jsonError("Only JPEG, PNG, WEBP or GIF images are supported.", 400);
  if (file.size > MAX_BYTES) return jsonError("Image must be smaller than 5MB.", 400);

  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage.from(FORUM_MEDIA_BUCKET).upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return jsonError("Couldn't upload that image.", 500);

  const { data } = supabaseAdmin.storage.from(FORUM_MEDIA_BUCKET).getPublicUrl(path);
  return Response.json({ url: data.publicUrl });
}
