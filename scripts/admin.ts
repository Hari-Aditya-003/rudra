// scripts/admin.ts
import admin from "firebase-admin";
import fs from "node:fs";
import path from "node:path";

// --- bootstrap (unchanged) ---
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!keyPath || !fs.existsSync(keyPath) || !fs.statSync(keyPath).isFile()) {
  console.error(`❌ Service account JSON missing at ${keyPath ?? "<unset>"}`);
  process.exit(1);
}
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(fs.readFileSync(keyPath, "utf8"))
    ),
  });
}
const auth = admin.auth();

async function main() {
  const [cmd, ...args] = process.argv.slice(2);

  // --- NEW: create-user ---
  if (cmd === "create-user") {
    const [email, password, displayName, phoneNumber] = args;
    if (!email || !password) {
      console.log("Usage: tsx scripts/admin.ts create-user <email> <password> [displayName] [phoneNumber]");
      process.exit(1);
    }
    try {
      const user = await auth.createUser({
        email,
        password,
        displayName,
        phoneNumber,
        emailVerified: true,
        disabled: false,
      });
      console.log("✅ Created user:", user.uid, user.email);
    } catch (e: any) {
      console.error("❌", e.message);
      process.exit(1);
    }
    return;
  }

  // existing commands…
  if (cmd === "make-admin") {
    const [email] = args;
    if (!email) {
      console.log("Usage: tsx scripts/admin.ts make-admin <email>");
      process.exit(1);
    }
    try {
      const user = await auth.getUserByEmail(email);
      await auth.setCustomUserClaims(user.uid, { role: "ADMIN" });
      console.log(`✅ ${email} is now ADMIN`);
    } catch (e: any) {
      console.error("❌", e.message);
      process.exit(1);
    }
    return;
  }

  if (cmd === "check-admin") {
    const [email] = args;
    if (!email) {
      console.log("Usage: tsx scripts/admin.ts check-admin <email>");
      process.exit(1);
    }
    try {
      const user = await auth.getUserByEmail(email);
      console.log("Custom claims:", user.customClaims ?? {});
    } catch (e: any) {
      console.error("❌", e.message);
      process.exit(1);
    }
    return;
  }

  if (cmd === "set-password") {
    const [email, password] = args;
    if (!email || !password) {
      console.log("Usage: tsx scripts/admin.ts set-password <email> <password>");
      process.exit(1);
    }
    try {
      const user = await auth.getUserByEmail(email);
      await auth.updateUser(user.uid, { password });
      console.log("✅ Password updated");
    } catch (e: any) {
      console.error("❌", e.message);
      process.exit(1);
    }
    return;
  }

  if (cmd === "update-profile") {
    const [email, displayName, phoneNumber] = args;
    if (!email) {
      console.log("Usage: tsx scripts/admin.ts update-profile <email> [displayName] [phoneNumber]");
      process.exit(1);
    }
    try {
      const user = await auth.getUserByEmail(email);
      await auth.updateUser(user.uid, { displayName, phoneNumber });
      console.log("✅ Profile updated");
    } catch (e: any) {
      console.error("❌", e.message);
      process.exit(1);
    }
    return;
  }

  if (cmd === "list-admins") {
    const list = await auth.listUsers();
    const admins = list.users.filter(u => (u.customClaims as any)?.role === "ADMIN");
    console.log("Admins:", admins.map(a => ({ uid: a.uid, email: a.email, claims: a.customClaims })));
    return;
  }

  console.log("Commands: create-user | make-admin | check-admin | set-password | update-profile | list-admins");
}

main();