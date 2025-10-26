import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/serverAuth";

export async function GET() {
  const user = await getServerUser();
  return NextResponse.json({ user });
}