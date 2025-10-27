import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebaseAdmin";

export async function GET(): Promise<NextResponse> {
  try {
    const users = await getAuth().listUsers(1); // just 1 user
    return NextResponse.json({
      ok: true,
      sampleUser: users.users[0]?.uid ?? null,
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
