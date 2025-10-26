// server-side helpers
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export async function getCurrentUser() {
  const sid = (await cookies()).get("sessionUserId")?.value;
  if (!sid) return null;
  return prisma.user.findUnique({ where: { id: sid } });
}

export async function requireUser() {
  const u = await getCurrentUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}

export async function requireAdmin() {
  const u = await requireUser();
  if (u.role !== "ADMIN") throw new Error("FORBIDDEN");
  return u;
}