// src/lib/serverAuth.ts
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebaseAdmin";

export type ServerUser = { uid: string; email?: string | null; role: "ADMIN" | "USER" } | null;

export async function getServerUser(): Promise<ServerUser> {
  const jar = await cookies();
  const sessionCookie = jar.get("fbSession")?.value;   // <-- THIS COOKIE NAME
  if (!sessionCookie) return null;
  try {
    const decoded = await getAuth().verifySessionCookie(sessionCookie, true);
    const role = (decoded.role as "ADMIN" | "USER") ?? "USER";
    return { uid: decoded.uid, email: decoded.email ?? null, role };
  } catch {
    return null;
  }
}