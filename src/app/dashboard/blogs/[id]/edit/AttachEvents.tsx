"use client";

import { useEffect, useMemo, useState } from "react";

type EventLite = { id: string; title: string; startsAt?: string; published?: boolean };
type BlogDetail = {
  id: string;
  title: string;
  events: { id: string; title: string; startsAt?: string; published?: boolean }[];
};

export default function AttachEvents({ blogId }: { blogId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allEvents, setAllEvents] = useState<EventLite[]>([]);
  const [attached, setAttached] = useState<EventLite[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  // Load blog (attached events) + all public events
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const [blogRes, eventsRes] = await Promise.all([
          fetch(`/api/blogs/${blogId}`, { cache: "no-store" }),
          fetch(`/api/events`, { cache: "no-store" }), // returns published events
        ]);
        const blog: BlogDetail = await blogRes.json();
        const evts: EventLite[] = await eventsRes.json();

        if (!alive) return;
        setAttached(blog.events ?? []);
        setAllEvents(evts ?? []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [blogId]);

  const unattached = useMemo(() => {
    const set = new Set(attached.map((e) => e.id));
    return allEvents.filter((e) => !set.has(e.id));
  }, [allEvents, attached]);

  async function attach() {
    if (!selectedId) return;
    setSaving(true);
    try {
      const r = await fetch(`/api/blogs/${blogId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: selectedId }),
      });
      if (!r.ok) {
        const m = await r.json().catch(() => ({}));
        throw new Error(m?.error ?? "Attach failed");
      }
      // optimistic: move event from unattached -> attached
      const ev = allEvents.find((e) => e.id === selectedId);
      if (ev) setAttached((cur) => [...cur, ev]);
      setSelectedId("");
    } catch (e: any) {
      alert(e?.message ?? "Attach failed");
    } finally {
      setSaving(false);
    }
  }

  async function detach(id: string) {
    if (!confirm("Remove this event from the blog?")) return;
    setSaving(true);
    try {
      const r = await fetch(`/api/blogs/${blogId}/events`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id }),
      });
      if (!r.ok) {
        const m = await r.json().catch(() => ({}));
        throw new Error(m?.error ?? "Detach failed");
      }
      setAttached((cur) => cur.filter((e) => e.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Detach failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded border bg-white p-4">
      <h2 className="mb-3 text-lg font-medium">Events in this blog</h2>

      {loading ? (
        <div className="text-sm text-slate-600">Loading…</div>
      ) : (
        <>
          {/* Attached list */}
          {attached.length === 0 ? (
            <p className="text-sm text-slate-600">No events attached yet.</p>
          ) : (
            <ul className="space-y-2">
              {attached.map((e) => (
                <li key={e.id} className="flex items-center justify-between rounded border p-2">
                  <div className="text-sm">
                    <div className="font-medium">{e.title}</div>
                    {e.startsAt && (
                      <div className="text-xs text-slate-500">
                        {new Date(e.startsAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => detach(e.id)}
                    disabled={saving}
                    className="rounded border px-2 py-1 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Attach control */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="min-w-56 rounded border px-2 py-2 text-sm"
            >
              <option value="">Select an event to attach…</option>
              {unattached.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
            <button
              onClick={attach}
              disabled={!selectedId || saving}
              className="rounded bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-60"
            >
              {saving ? "Saving…" : "Attach"}
            </button>
          </div>

          {unattached.length === 0 && (
            <p className="mt-2 text-xs text-slate-500">
              No more available events. Create one in <a className="underline" href="/dashboard/events">Manage Events</a>.
            </p>
          )}
        </>
      )}
    </section>
  );
}