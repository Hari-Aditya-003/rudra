import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "../_components/EventForm";

export default async function NewEventPage() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true } });
  if (!me || me.role !== "ADMIN") redirect("/");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Create Event</h1>
      <div className="rounded border bg-white p-4">
        <EventForm />
      </div>
    </div>
  );
}