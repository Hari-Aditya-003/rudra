// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  // ensure admin exists
  const adminEmail = "admin@example.com";
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: "Administrator",
      phone: "+91 99999 99999",  // ✅ required phone
      role: Role.ADMIN,
      passwordHash,
    },
    update: {
      // in case already exists, ensure role + phone are correct
      role: Role.ADMIN,
      phone: "+91 99999 99999",
    },
  });

  // create an event (if none)
  const event = await prisma.event.upsert({
    where: { id: "seed-event-1" }, // fake key: use cuid if you prefer
    update: {},
    create: {
      id: "seed-event-1",
      title: "Welcome Meetup",
      description: "First community meetup.",
      ownerId: admin.id,
      published: true,
    },
  });

  // create a blog (only if doesn’t exist already)
  const blog = await prisma.blog.upsert({
    where: { id: "seed-blog-1" },
    update: {},
    create: {
      id: "seed-blog-1",
      title: "Launch Notes",
      content: "We’re live! 🎉",
      authorId: admin.id,
      events: { connect: { id: event.id } }, // attach the event
    },
  });

  console.log("✅ Seeded:", {
    admin: admin.email,
    event: event.title,
    blog: blog.title,
  });
}

main().finally(() => prisma.$disconnect());