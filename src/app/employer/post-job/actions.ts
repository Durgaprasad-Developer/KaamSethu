// app/employer/post-job/actions.ts
"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createEmployer, getEmployerByUserId, createJob } from "@/lib/db/queries";

export async function postJob(formData: FormData) {
  const session = await getSession();
  
  if (!session || session.userType !== 'employer') {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const skill = formData.get("skill") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const budget = parseInt(formData.get("budget") as string);
  const urgent = formData.get("urgent") === "true";
  const employerName = formData.get("employerName") as string;
  
  if (!title || !skill || !description || !location || !budget) {
    return { error: "Missing required fields" };
  }

  try {
    // Check if employer profile exists
    let employer = await getEmployerByUserId(session.id);
    
    if (!employer) {
      // Create employer profile if doesn't exist
      employer = await createEmployer({
        userId: session.id,
        name: employerName || "Employer",
        location,
      });
    }

    // Create job posting
    const job = await createJob({
      employerId: employer.id,
      title,
      skill,
      description,
      location,
      budget,
      budgetType: 'daily',
      urgent,
      startDate: new Date(),
    });

    // Redirect to matches page with job ID
    redirect(`/employer/matches?jobId=${job.id}`);
  } catch (error) {
    console.error("Error posting job:", error);
    return { error: "Failed to post job" };
  }
}
