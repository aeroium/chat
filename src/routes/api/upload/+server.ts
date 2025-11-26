import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";
import { json, error } from "@sveltejs/kit";
import { put } from "@vercel/blob";

export async function POST({ request }) {
  const form = await request.formData();
  const file = form.get("file") as File | null;

  if (!file) throw error(400, "No file provided");

  if (file.size > 5 * 1024 * 1024) {
    throw error(413, "File too large (max 5MB)");
  }

  if (!file.type.startsWith("image/")) {
    throw error(400, "Must be an image");
  }

  const blob = await put(file.name, file, {
    access: "public",
    token: BLOB_READ_WRITE_TOKEN,
  });

  return json({ url: blob.url });
}
