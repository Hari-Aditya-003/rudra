import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Facebook({ allowDangerousEmailAccountLinking: true }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // ensure a local user exists (by email)
      const email = profile?.email as string | undefined;
      if (!email) return false;

      const name =
        (profile as any)?.name ||
        `${(profile as any)?.given_name ?? ""} ${(profile as any)?.family_name ?? ""}`.trim() ||
        "User";

      const phone = ""; // unknown from OAuth; keep empty or default
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, name, phone: phone || "N/A", passwordHash: "" },
      });
      return true;
    },
    async jwt({ token }) {
      // attach our local user id
      if (token?.email) {
        const u = await prisma.user.findUnique({ where: { email: String(token.email) }, select: { id: true } });
        if (u) (token as any).localUserId = u.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).localUserId = (token as any).localUserId;
      return session;
    },
  },
});

export { handler as GET, handler as POST };