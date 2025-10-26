import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase-admin";

(async () => {
  const auth = getAuth();
  let nextPageToken: string | undefined = undefined;
  let total = 0;

  do {
    const list = await auth.listUsers(1000, nextPageToken);
    const uids = list.users.map(u => u.uid);
    if (uids.length) {
      // batch delete (max 1000)
      const res = await auth.deleteUsers(uids);
      total += res.successCount;
      console.log(`Deleted ${res.successCount} users, errors: ${res.failureCount}`);
      if (res.failureCount) console.log(res.errors);
    }
    nextPageToken = list.pageToken;
  } while (nextPageToken);

  console.log(`✅ Done. Total deleted: ${total}`);
  process.exit(0);
})();