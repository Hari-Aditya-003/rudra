import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // trivial call to ensure Admin can get an access token
    await getAuth().listUsers(1);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
