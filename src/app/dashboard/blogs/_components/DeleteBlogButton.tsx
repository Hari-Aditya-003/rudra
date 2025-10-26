"use client";

export default function DeleteBlogButton({ id }: { id: string }) {
  return (
    <button
      className="rounded border px-2 py-1"
      onClick={async () => {
        if (!confirm("Delete this blog?")) return;
        const r = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
        if (r.ok) location.reload();
        else alert((await r.json().catch(() => ({})))?.error ?? "Delete failed");
      }}
    >
      Delete
    </button>
  );
}