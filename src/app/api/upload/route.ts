import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ImageUploadError, uploadImage } from "@/lib/blob";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Faca login para enviar imagens." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  try {
    const blob = await uploadImage(file, `uploads/${session.user.id}`);
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    if (error instanceof ImageUploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
