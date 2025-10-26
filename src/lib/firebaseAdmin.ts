// src/lib/firebaseAdmin.ts
import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";

// Ensure admin is initialized only once
if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(), // uses GOOGLE_APPLICATION_CREDENTIALS file
  });
}

export {};