import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // trivial call to ensure Admin can get an access token
    await getAuth().listUsers(1);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}