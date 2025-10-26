"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BlogInit = { id?: string; title?: string; content?: string };

export default function BlogForm({ initial }: { initial?: BlogInit }) {
  const r = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const isEdit = Boolean(initial?.id);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEdit ? `/api/blogs/${initial!.id}` : `/api/blogs`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Save failed");
      }
      r.push("/dashboard/blogs");
      r.refresh();
    } catch (err: any) {
      alert(err?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Title</label>
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Content</label>
        <textarea
          className="h-40 w-full resize-y rounded border px-3 py-2 text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
        />
      </div>

      <button
        disabled={saving}
        className="rounded bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-60"
      >
        {saving ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
}