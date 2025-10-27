"use client";

import { X, CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export type Batch = { id: string; date: string; center: string; seats?: string };
export type Center = { id: string; name: string; address?: string };

export default function ScheduleModal({
  open,
  onClose,
  courseTitle,
  batches,
  centers,
}: {
  open: boolean;
  onClose: () => void;
  courseTitle: string | null;
  batches: Batch[];
  centers: Center[];
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1200]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal Sheet */}
      <div className="absolute inset-x-0 bottom-0 mx-auto w-[min(940px,92vw)] rounded-t-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-y-auto max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b px-5 py-4 md:px-7">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              <CalendarDays className="h-4 w-4" /> New batches every 2 weeks
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {courseTitle ? `Schedule — ${courseTitle}` : "Batch Schedule"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_.9fr] md:p-7">
          {/* Left - Batches & Centers */}
          <div>
            {batches.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 text-neutral-600">
                    <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
                      <th className="w-[42%]">Dates</th>
                      <th className="w-[38%]">Center</th>
                      <th className="w-[20%]">Seats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {batches.map((b) => (
                      <tr key={b.id} className="[&>td]:px-3 [&>td]:py-2">
                        <td className="font-medium text-neutral-900">{b.date}</td>
                        <td className="text-neutral-700">{b.center}</td>
                        <td className="text-neutral-600">{b.seats ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">No upcoming batches listed.</p>
            )}

            {centers.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {centers.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-lg border border-neutral-200 bg-white p-3 text-sm"
                  >
                    <div className="flex items-center gap-2 font-semibold text-neutral-900">
                      <MapPin className="h-4 w-4 text-sky-600" />
                      {c.name}
                    </div>
                    {c.address && (
                      <p className="mt-1 text-neutral-600">{c.address}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Request Form */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm md:p-5">
            <h4 className="text-base font-semibold text-neutral-900">Request a Slot</h4>
            <p className="mt-1 text-sm text-neutral-600">
              Share your details and preferred center. We’ll confirm the next available batch.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-4 grid gap-3">
              <input
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-200"
                placeholder="Full name"
              />
              <input
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-200"
                placeholder="Email"
                type="email"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-200"
                  placeholder="Phone"
                />
                <input
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-200"
                  placeholder="Preferred center"
                  defaultValue={centers[0]?.name}
                />
              </div>
              <textarea
                className="min-h-[92px] rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-200"
                placeholder="Any questions or timing preference?"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition">
                Submit Request <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="h-3.5 w-3.5" />
                Typical response: within a business day
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                Or email{" "}
                <a href="mailto:hello@yourcompany.com" className="underline">
                  hello@yourcompany.com
                </a>
              </div>
            </form>

            <div className="mt-5 rounded-lg bg-sky-50 p-3 text-xs text-sky-900 ring-1 ring-sky-100">
              DGCA-compliant curriculum • Licensed trainers • Flight hours on real missions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
