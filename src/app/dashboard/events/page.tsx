import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteEventButton from "./_components/DeleteEventButton";

export default async function AdminEventsPage() {
  const cookieStore = await cookies();                      // ✅ await in Next 15
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true }});
  if (!me || me.role !== "ADMIN") redirect("/");

  const events = await prisma.event.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Events</h1>
        <a href="/dashboard/events/new" className="rounded bg-blue-600 px-3 py-2 text-white">Add Event</a>
      </div>

      <ul className="divide-y rounded border bg-white">
        {events.map((e) => (
          <li key={e.id} className="p-3">
            <div className="font-medium">{e.title}</div>
            <div className="text-sm text-slate-600">{e.description}</div>
            <div className="mt-2 flex gap-2">
              <a className="rounded border px-2 py-1" href={`/dashboard/events/${e.id}/edit`}>Edit</a>
              <DeleteEventButton id={e.id} />
            </div>
          </li>
        ))}
        {events.length === 0 && <li className="p-3 text-sm text-slate-600">No events yet.</li>}
      </ul>
    </div>
  );
}