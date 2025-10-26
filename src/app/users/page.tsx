import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function UsersAdminPage() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sessionUserId")?.value;
  if (!sid) redirect("/login");

  const me = await prisma.user.findUnique({
    where: { id: String(sid) },
    select: { role: true },
  });
  if (!me || me.role !== "ADMIN") redirect("/");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-3 py-2">{u.name ?? "-"}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.phone ?? "-"}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-slate-600" colSpan={5}>
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}