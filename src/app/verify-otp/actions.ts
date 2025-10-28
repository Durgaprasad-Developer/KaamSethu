// app/verify-otp/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserByPhone, createUser, updateUserLogin } from "@/lib/db/queries";

export async function verifyOtp(formData: FormData) {
  const phone = formData.get("phone") as string;
  const token = formData.get("token") as string;
  const userType = (formData.get("userType") as string || "worker") as 'worker' | 'employer';
  
  if (!phone || !token) {
    const phoneParam = encodeURIComponent(phone || "");
    return redirect(
      `/verify-otp?phone=${phoneParam}&type=${userType}&message=Phone and OTP are required`
    );
  }
  
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "sms", // Specify the type as 'sms'
  });

  if (error) {
    console.error("OTP Verification Error:", error.message);
    // Redirect back to the verification page with an error
    const phoneParam = encodeURIComponent(phone);
    const errorMessage = error.message.includes("expired") 
      ? "OTP has expired. Please request a new one."
      : error.message.includes("invalid")
      ? "Invalid OTP. Please check and try again."
      : "Verification failed. Please try again.";
    
    return redirect(
      `/verify-otp?phone=${phoneParam}&type=${userType}&message=${encodeURIComponent(errorMessage)}`
    );
  }

  // Save user to database
  if (data.user) {
    let dbUser = await getUserByPhone(phone);
    
    if (!dbUser) {
      dbUser = await createUser(phone, userType, data.user.id);
    } else {
      await updateUserLogin(dbUser.id);
    }
  }

  console.log("OTP verified successfully for:", phone);
  
  // Redirect based on user type
  if (userType === "employer") {
    return redirect("/employer/post-job");
  } else {
    return redirect("/worker/voice-intro");
  }
}