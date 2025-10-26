import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/serverAuth";

export default async function DashboardPage() {
  const me = await getServerUser();
  if (!me) redirect("/login");
  if (me.role !== "ADMIN") redirect("/");  // gate admin

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      {/* ... admin controls ... */}
    </div>
  );
}