import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "../../_components/EventForm";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");
  const me = await prisma.user.findUnique({ where: { id: String(sid) }, select: { role: true } });
  if (!me || me.role !== "ADMIN") redirect("/");

  const e = await prisma.event.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, description: true, startsAt: true, endsAt: true, mediaUrl: true, youtubeId: true, published: true },
  });
  if (!e) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Event</h1>
      <div className="rounded border bg-white p-4">
        <EventForm initial={{
          id: e.id,
          title: e.title,
          description: e.description ?? "",
          startsAt: e.startsAt ? new Date(e.startsAt).toISOString().slice(0,16) : "",
          endsAt: e.endsAt ? new Date(e.endsAt).toISOString().slice(0,16) : "",
          mediaUrl: e.mediaUrl ?? "",
          youtubeId: e.youtubeId ?? "",
          published: e.published,
        }} />
      </div>
    </div>
  );
}