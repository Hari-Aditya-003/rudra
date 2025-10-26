import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const cookieStore = await cookies(); // ✅ Next 15
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: String(sid) },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true }, // ⬅️ phone
  });
  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-sm text-slate-600">
          Welcome back{user.name ? `, ${user.name}` : ""}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-medium">Profile</h2>
          <div className="text-sm">
            <div><span className="text-slate-500">Name:</span> {user.name ?? "-"}</div>
            <div><span className="text-slate-500">Email:</span> {user.email}</div>
            <div><span className="text-slate-500">Phone:</span> {user.phone ?? "-"}</div> {/* ⬅️ */}
            <div><span className="text-slate-500">Role:</span> {user.role}</div>
            <div><span className="text-slate-500">Member since:</span> {user.createdAt.toDateString()}</div>
          </div>
        </section>

        <section className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-medium">Actions</h2>
          <form action="/api/logout" method="POST">
            <button className="rounded border px-3 py-2 text-sm hover:bg-slate-50">Logout</button>
          </form>
        </section>
      </div>
    </div>
  );
}