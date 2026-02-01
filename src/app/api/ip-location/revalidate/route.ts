import { REVALIDATE_SECRET } from "@/config/env";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path, secret } = await req.json();

    // Protect endpoint
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
