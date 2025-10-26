// src/lib/events.ts
// Client-side helpers that call your API using the session cookie.
// No Firebase, no Authorization header needed.

export type EventInput = {
  title: string;
  description: string;
  startsAt?: string; // ISO or yyyy-MM-ddTHH:mm
  endsAt?: string | null;
  mediaUrl?: string | null;
  youtubeId?: string | null;
  published?: boolean;
};

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = "Request failed";
    try { const j = await res.json(); msg = j?.error ?? msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function listEvents() {
  const res = await fetch("/api/events", { cache: "no-store" });
  return json<any[]>(res);
}

export async function createEvent(data: EventInput) {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return json<any>(res);
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
  const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return json<any>(res);
}

export async function deleteEvent(id: string) {
  const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return json<{ ok: true }>(res);
}