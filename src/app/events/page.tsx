// src/app/events/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  CalendarDays,
  Radio,
  PlayCircle,
  Edit3,
  Trash2,
  Plus,
  Clock,
} from "lucide-react";

/* ------------------------- Types that match your API ------------------------- */
type Me = { id: string; role: "USER" | "ADMIN" } | null;

type Event = {
  id: string;
  title: string;
  description: string;
  date?: string;             // ISO string (start date/time)
  endDate?: string;          // optional ISO end
  status?: "LIVE" | "UPCOMING" | "PAST";
  youtubeId?: string;        // e.g. "dQw4w9WgXcQ"
  coverImage?: string;       // optional fallback thumbnail
  location?: string;
};

/* ------------------------------- Page --------------------------------- */
export default function EventsPage() {
  const [me, setMe] = useState<Me>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/me").then(async (r) => setMe(r.ok ? (await r.json()).user : null));
    fetch("/api/events").then(async (r) => setEvents(r.ok ? await r.json() : []));
  }, []);

  const isAdmin = me?.role === "ADMIN";

  /* Spotlight priority: a LIVE event; if none, the next UPCOMING with youtubeId; else null */
  const spotlight = useMemo(() => {
    const byStatus = (s: Event["status"]) => events.find((e) => e.status === s);
    return byStatus("LIVE") || events.find((e) => e.status === "UPCOMING" && !!e.youtubeId) || null;
  }, [events]);

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => e.status === "UPCOMING" && e.id !== spotlight?.id)
        .sort(compareByDateAsc),
    [events, spotlight]
  );
  const past = useMemo(
    () => events.filter((e) => e.status === "PAST").sort(compareByDateDesc),
    [events]
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero: dark gradient header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 text-xs font-semibold ring-1 ring-emerald-500/30">
            <Radio className="h-4 w-4" /> Streams • Launches • Meetups
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Events &amp; Live Streams
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-neutral-400">
            Catch our YouTube lives, product deep dives, and community sessions. Replays
            are available right after we go off air.
          </p>

          {isAdmin && (
            <a
              href="/dashboard/events"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-semibold hover:bg-emerald-500 transition"
            >
              <Plus className="h-4 w-4" />
              Create Event
            </a>
          )}
        </div>
      </section>

      {/* Spotlight: Live or Next stream */}
      {spotlight && (
        <Spotlight event={spotlight} isAdmin={isAdmin} className="mt-8" />
      )}

      {/* Upcoming */}
      <Section title="Upcoming" icon={<CalendarDays className="h-5 w-5" />}>
        {upcoming.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} e={e} isAdmin={isAdmin} />
            ))}
          </div>
        ) : (
          <EmptyState text="No upcoming streams. Subscribe to get notified when we go live!" />
        )}
      </Section>

      {/* Past / Replays */}
      <Section title="Replays & Past Events" icon={<CalendarClock className="h-5 w-5" />}>
        {past.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.id} e={e} isAdmin={isAdmin} />
            ))}
          </div>
        ) : (
          <EmptyState text="No past events yet." />
        )}
      </Section>
    </main>
  );
}

/* ------------------------------- Components ------------------------------- */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-6 flex items-center gap-2">
        {icon}
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Spotlight({
  event,
  isAdmin,
  className = "",
}: {
  event: Event;
  isAdmin: boolean;
  className?: string;
}) {
  const dateStr = event.date ? formatDateTime(event.date, event.endDate) : undefined;

  return (
    <section className={`mx-auto max-w-7xl px-5 ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 shadow-2xl">
        {/* Glow frame */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10" />
        <div className="grid gap-0 md:grid-cols-2">
          {/* Video / Image */}
          <div className="relative">
            {event.youtubeId ? (
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${event.youtubeId}?rel=0&modestbranding=1&color=white`}
                  title={event.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className="aspect-video w-full bg-neutral-800 grid place-items-center text-neutral-400"
                style={{
                  backgroundImage: event.coverImage ? `url(${event.coverImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!event.coverImage && <PlayCircle className="h-12 w-12" />}
              </div>
            )}

            {/* LIVE Badge */}
            {event.status === "LIVE" && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                <span className="mx-0.5 inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                LIVE
              </span>
            )}
          </div>

          {/* Right: meta */}
          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-extrabold">{event.title}</h3>
            {dateStr && (
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-neutral-300 ring-1 ring-white/10">
                <Clock className="h-4 w-4 text-emerald-300" />
                {dateStr}
              </p>
            )}
            <p className="mt-4 text-neutral-300 leading-relaxed">{event.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {event.youtubeId && (
                <a
                  href={`https://youtube.com/watch?v=${event.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold hover:bg-emerald-500"
                >
                  <PlayCircle className="h-5 w-5" />
                  Watch on YouTube
                </a>
              )}

              {isAdmin && (
                <div className="ml-auto flex gap-2">
                  <AdminEditButtons />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ e, isAdmin }: { e: Event; isAdmin: boolean }) {
  const dateStr = e.date ? formatDateTime(e.date, e.endDate) : undefined;

  return (
    <article className="group overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 shadow-lg transition hover:-translate-y-0.5 hover:ring-emerald-400/30">
      {/* Thumb */}
      <div
        className="aspect-video w-full bg-neutral-800 grid place-items-center text-neutral-500"
        style={{
          backgroundImage: e.coverImage ? `url(${e.coverImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!e.coverImage && <PlayCircle className="h-10 w-10 group-hover:scale-110 transition" />}
        {e.status === "LIVE" && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-emerald-300">
          {e.title}
        </h3>
        {dateStr && (
          <p className="mt-1 text-xs text-neutral-400">{dateStr}</p>
        )}
        <p className="mt-2 text-sm text-neutral-300 line-clamp-3">{e.description}</p>

        {isAdmin && (
          <div className="mt-4 flex gap-2">
            <AdminEditButtons compact />
          </div>
        )}
      </div>
    </article>
  );
}

function AdminEditButtons({ compact }: { compact?: boolean }) {
  const cls =
    "inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm transition";
  return (
    <>
      <button className={`${cls} border-white/10 bg-white/5 hover:bg-white/10`}>
        <Edit3 className="h-4 w-4" /> {!compact && "Edit"}
      </button>
      <button className={`${cls} border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/15`}>
        <Trash2 className="h-4 w-4" /> {!compact && "Delete"}
      </button>
    </>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center text-neutral-300">
      {text}
    </div>
  );
}

/* ------------------------------- Utils --------------------------------- */

function formatDateTime(from?: string, to?: string) {
  try {
    const start = new Date(from!);
    const end = to ? new Date(to) : null;
    const fmt: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const startStr = start.toLocaleString(undefined, fmt);
    if (!end) return startStr;
    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();
    const endFmt: Intl.DateTimeFormatOptions = sameDay
      ? { hour: "2-digit", minute: "2-digit" }
      : fmt;
    return `${startStr} — ${end.toLocaleString(undefined, endFmt)}`;
  } catch {
    return undefined;
  }
}

function compareByDateAsc(a: Event, b: Event) {
  return new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime();
}
function compareByDateDesc(a: Event, b: Event) {
  return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
}