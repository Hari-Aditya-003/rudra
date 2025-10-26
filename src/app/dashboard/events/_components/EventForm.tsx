"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Init = {
  id?: string;
  title?: string;
  description?: string;
  startsAt?: string; // "YYYY-MM-DDTHH:mm"
  endsAt?: string;   // "YYYY-MM-DDTHH:mm"
  mediaUrl?: string | null;
  youtubeId?: string | null;
  published?: boolean;
};

export default function EventForm({ initial }: { initial?: Init }) {
  const r = useRouter();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [startsAt, setStartsAt] = useState(initial?.startsAt ?? "");
  const [endsAt, setEndsAt] = useState(initial?.endsAt ?? "");
  const [mediaUrl, setMediaUrl] = useState(initial?.mediaUrl ?? "");
  const [youtubeId, setYoutubeId] = useState(initial?.youtubeId ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      const payload = {
        title,
        description,
        startsAt: startsAt || undefined,
        endsAt: endsAt || undefined,
        mediaUrl: mediaUrl || undefined,
        youtubeId: youtubeId || undefined,
        published,
      };
      const url = isEdit ? `/api/events/${initial!.id}` : `/api/events`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Save failed");
      r.replace("/dashboard/events");
      r.refresh();
    } catch (e: any) {
      setErr(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {err && <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">{err}</div>}

      <div>
        <label className="mb-1 block text-sm">Title</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Description</label>
        <textarea
          className="w-full rounded border px-3 py-2"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Starts At</label>
          <input
            type="datetime-local"
            className="w-full rounded border px-3 py-2"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">Ends At</label>
          <input
            type="datetime-local"
            className="w-full rounded border px-3 py-2"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Media URL</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={mediaUrl ?? ""}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">YouTube ID</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={youtubeId ?? ""}
            onChange={(e) => setYoutubeId(e.target.value)}
            placeholder="dQw4w9WgXcQ"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
      >
        {saving ? (isEdit ? "Updating…" : "Creating…") : isEdit ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}