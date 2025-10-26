import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const users = await getAuth().listUsers(1); // just 1 user
    return NextResponse.json({ ok: true, sampleUser: users.users[0]?.uid });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}