import { put, del } from "@vercel/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export class ImageUploadError extends Error {}

export async function uploadImage(file: File, folder: string) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new ImageUploadError("Formato de imagem nao suportado. Use JPEG, PNG, WEBP ou GIF.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new ImageUploadError("Imagem maior que 5MB.");
  }

  const extension = file.type.split("/")[1];
  const pathname = `${folder}/${crypto.randomUUID()}.${extension}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob;
}

export async function deleteImage(url: string) {
  await del(url);
}
