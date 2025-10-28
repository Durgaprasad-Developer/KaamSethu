// app/worker/apply/actions.ts
"use server";

import { getSession } from "@/lib/auth/session";
import { createApplication, getWorkerByUserId } from "@/lib/db/queries";

export async function applyForJob(formData: FormData) {
  const session = await getSession();
  
  if (!session || session.userType !== 'worker') {
    return { error: "Unauthorized" };
  }

  const jobId = parseInt(formData.get("jobId") as string);
  const message = formData.get("message") as string;
  
  if (!jobId) {
    return { error: "Job ID required" };
  }

  try {
    const worker = await getWorkerByUserId(session.id);
    
    if (!worker) {
      return { error: "Worker profile not found" };
    }

    await createApplication({
      jobId,
      workerId: worker.id,
      message: message || undefined,
    });

    return { success: true };
  } catch (error) {
    console.error("Error applying for job:", error);
    return { error: "Failed to apply for job" };
  }
}
