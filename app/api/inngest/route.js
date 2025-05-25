// app/api/inngest/route.ts (for App Router)

import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  createUserOrder,
} from "@/config/inngest";

// Serve Inngest functions to handle Clerk and order events
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder,
  ],
});
