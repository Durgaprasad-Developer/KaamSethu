// app/worker/profile-preview/actions.ts
"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createWorker, getWorkerByUserId, updateWorker } from "@/lib/db/queries";

export async function saveWorkerProfile(formData: FormData) {
  const session = await getSession();
  
  if (!session || session.userType !== 'worker') {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const skill = formData.get("skill") as string;
  const experience = formData.get("experience") as string;
  const location = formData.get("location") as string;
  const languages = formData.get("languages") as string; // JSON string
  
  if (!name || !skill || !location) {
    return { error: "Missing required fields" };
  }

  try {
    // Check if worker profile already exists
    const existingWorker = await getWorkerByUserId(session.id);
    
    if (existingWorker) {
      // Update existing profile
      await updateWorker(existingWorker.id, {
        name,
        skill,
        experience,
        location,
        languages: languages ? JSON.parse(languages) : [],
      });
    } else {
      // Create new worker profile
      await createWorker({
        userId: session.id,
        name,
        skill,
        experience,
        location,
        languages: languages ? JSON.parse(languages) : [],
        hourlyRate: 500,
        dailyRate: 3000,
      });
    }

    redirect("/worker/dashboard");
  } catch (error) {
    console.error("Error saving worker profile:", error);
    return { error: "Failed to save profile" };
  }
}
