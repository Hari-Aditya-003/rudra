"use client";

export default function DeleteEventButton({ id }: { id: string }) {
  async function onDelete() {
    if (!confirm("Delete this event?")) return;
    const r = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (r.ok) location.reload();
    else {
      const data = await r.json().catch(() => ({}));
      alert(data?.error ?? "Delete failed");
    }
  }
  return <button onClick={onDelete} className="rounded border px-2 py-1">Delete</button>;
}