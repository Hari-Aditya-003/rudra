import Link from "next/link";
import LoginForm from "@/components/LoginForm"; // ✅ correct path

export default function LoginPage() {
  return (
    <div className="mx-auto mt-12 max-w-md rounded border bg-white p-6">
      <h1 className="mb-1 text-center text-2xl font-semibold">Login</h1>
      <p className="mb-4 text-center text-sm text-slate-500">Welcome back</p>

      <LoginForm />

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}