// app/employer/rate-worker/actions.ts
"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createReview } from "@/lib/db/queries";

export async function submitRating(formData: FormData) {
  const session = await getSession();
  
  if (!session || session.userType !== 'employer') {
    return { error: "Unauthorized" };
  }

  const jobId = parseInt(formData.get("jobId") as string);
  const workerId = parseInt(formData.get("workerId") as string);
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;
  const badges = formData.get("badges") as string; // JSON array string
  
  if (!jobId || !workerId || !rating) {
    return { error: "Missing required fields" };
  }

  try {
    await createReview({
      jobId,
      reviewerId: session.id,
      revieweeId: workerId,
      rating,
      comment: comment || undefined,
      badges: badges ? JSON.parse(badges) : [],
    });

    redirect("/employer/matches");
  } catch (error) {
    console.error("Error submitting rating:", error);
    return { error: "Failed to submit rating" };
  }
}
