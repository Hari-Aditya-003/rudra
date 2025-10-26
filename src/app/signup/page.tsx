import Link from "next/link";
import SignupForm from "@/components/SignupForm"; // ✅ correct path

export default function SignupPage() {
  return (
    <div className="mx-auto mt-12 max-w-md rounded border bg-white p-6">
      <h1 className="mb-1 text-center text-2xl font-semibold">Create account</h1>
      <p className="mb-4 text-center text-sm text-slate-500">Welcome</p>

      <SignupForm />

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}