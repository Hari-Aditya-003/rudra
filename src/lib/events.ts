// src/lib/events.ts
// Client-side helpers that call your API using the session cookie.
// No Firebase, no Authorization header needed.

export type EventInput = {
  title: string;
  description: string;
  startsAt?: string; // ISO string (e.g. "2025-10-27T18:00")
  endsAt?: string | null;
  mediaUrl?: string | null;
  youtubeId?: string | null;
  published?: boolean;
};

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = "Request failed";
    try {
      const j = await res.json();
      msg = j?.error ?? msg;
    } catch {
      // Do nothing, fall back to default message
    }
    throw new Error(msg);
  }
  return res.json();
}

/**
 * Get all events.
 */
export async function listEvents(): Promise<any[]> {
  const res = await fetch("/api/events", { cache: "no-store" });
  return json<any[]>(res);
}

/**
 * Create a new event.
 */
export async function createEvent(data: EventInput): Promise<any> {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return json<any>(res);
}

/**
 * Update an existing event by ID.
 */
export async function updateEvent(id: string, data: Partial<EventInput>): Promise<any> {
  const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return json<any>(res);
}

/**
 * Delete an event by ID.
 */
export async function deleteEvent(id: string): Promise<{ ok: true }> {
  const res = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return json<{ ok: true }>(res);
}
