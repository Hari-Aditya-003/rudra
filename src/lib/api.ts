import { auth } from "@/lib/firebase";

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) throw new Error("No user authenticated");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
}